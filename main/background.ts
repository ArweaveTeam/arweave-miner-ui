import path from "path";
import { app, ipcMain, shell, BrowserWindow } from "electron";
import serve from "electron-serve";
import parsePrometheusTextFormat from "parse-prometheus-text-format";
import { createWindow } from "./helpers";
import { PrometheusMetricParser } from "./types/prometheus";
import { SetMetricsStateActionPayload } from "../types/metrics";
import * as config from "./config";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: BrowserWindow;

(async () => {
  await app.whenReady();
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       "Content-Security-Policy": ["script-src 'self' localhost:8888"],
  //     },
  //   });
  // });

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

let isAlive = true;
app.on("window-all-closed", () => {
  isAlive = false;
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

// TODO make generic function for creating pub+sub endpoints
// TODO make class for subscription management
let cachedMetrics: SetMetricsStateActionPayload | null = null;
let cachedMetricsStr = "";
// TODO list of webContents
// let cachedMetricsSubList = [];
let cachedMetricsIsSubActive = false;
let cachedMetricsTimeout: NodeJS.Timeout | null = null;
let cachedMetricsUpdateInProgress = false;
// TODO move to config
const currentNodeId = 0;

function metricStringParse(item: PrometheusMetricParser | undefined): number | null {
  if (!item) return null;
  return +item.metrics[0].value;
}

async function getMetrics(): Promise<SetMetricsStateActionPayload> {
  console.log("DEBUG: getMetrics start");
  const nodeList = config.configHandler.configGetNodes();
  // temp for development
  const node = nodeList[currentNodeId] || {
    id: "",
    name: "",
    host: "testnet-3.arweave.net",
    port: "1984",
    protocol: "http",
  };
  const url = `${node.protocol}://${node.host}:${node.port}/metrics`;
  const res = await fetch(url);
  const data = await res.text();

  const parsed: PrometheusMetricParser[] = parsePrometheusTextFormat(data) || [];
  let dataUnpacked = 0;
  let dataPacked = 0;
  let storageAvailable = 0;
  const packingItem = parsed.find(
    (item: PrometheusMetricParser) => item.name === "v2_index_data_size_by_packing",
  );
  if (packingItem) {
    packingItem.metrics.forEach((item) => {
      // unpacked storage modules are not involved in mining
      if (item.labels.packing == "unpacked") {
        dataUnpacked += +item.value;
      } else {
        dataPacked += +item.value;
      }
      const partitionSize = +item.labels.partition_size;
      if (isFinite(partitionSize)) {
        storageAvailable += partitionSize;
      }
    });
  }
  const hashRate = metricStringParse(
    parsed.find((item: PrometheusMetricParser) => item.name === "average_network_hash_rate"),
  );
  const earnings = metricStringParse(
    parsed.find((item: PrometheusMetricParser) => item.name === "average_block_reward"),
  );

  const vdf_step_time_milliseconds_bucket = parsed.find(
    (item: PrometheusMetricParser) => item.name === "vdf_step_time_milliseconds",
  );
  let vdfTimeLowerBound: number | null = null;
  if (vdf_step_time_milliseconds_bucket) {
    const buckets = vdf_step_time_milliseconds_bucket.metrics[0].buckets;
    for (const k in buckets) {
      const value = buckets[k];
      if (value === "0") continue;
      if (!vdfTimeLowerBound) {
        vdfTimeLowerBound = +k;
      }
    }
  }
  const weaveSize = metricStringParse(
    parsed.find((item: PrometheusMetricParser) => item.name === "weave_size"),
  );
  console.log("DEBUG: getMetrics complete");
  return {
    dataUnpacked,
    dataPacked,
    storageAvailable,
    weaveSize,
    hashRate,
    earnings,
    vdfTimeLowerBound,
    node,
  };
}

async function cachedMetricsUpdate() {
  try {
    cachedMetricsUpdateInProgress = true;
    cachedMetrics = await getMetrics();
  } catch (err) {
    console.error(err);
  }
  cachedMetricsUpdateInProgress = false;
}
function cachedMetricsPush() {
  const newCachedMetricsStr = JSON.stringify(cachedMetrics);
  if (cachedMetricsStr !== newCachedMetricsStr && mainWindow) {
    cachedMetricsStr = newCachedMetricsStr;
    mainWindow.webContents.send("metricsPush", cachedMetrics);
  }
}

async function cachedMetricsUpdatePing() {
  if (!isAlive) return;
  if (cachedMetricsUpdateInProgress) return;
  if (cachedMetricsTimeout) {
    clearTimeout(cachedMetricsTimeout);
    cachedMetricsTimeout = null;
    // extra push fast. Needed on initial subscription
    cachedMetricsPush();
    await cachedMetricsUpdate();
    cachedMetricsPush();
  }
  // extra check needed
  if (!isAlive) return;
  // prod active value 1000
  // debug active value 10000 (do not kill testnet node)
  const delay = cachedMetricsIsSubActive ? 10000 : 60000;
  cachedMetricsTimeout = setTimeout(async () => {
    // extra check needed
    if (!isAlive) return;
    cachedMetricsTimeout = null;
    await cachedMetricsUpdate();
    cachedMetricsPush();
    cachedMetricsUpdatePing();
  }, delay);
}

config.ev.on("nodes_update", () => {
  const node = config.configHandler.configGetNodes()[currentNodeId];
  if (cachedMetrics && JSON.stringify(cachedMetrics.node) !== JSON.stringify(node)) {
    cachedMetrics = null;
    cachedMetricsPush();
  }
  cachedMetricsUpdatePing();
});

(async function () {
  await cachedMetricsUpdate();
  cachedMetricsPush();
  cachedMetricsUpdatePing();
})();

ipcMain.on("metricsSub", async () => {
  cachedMetricsIsSubActive = true;
  cachedMetricsUpdatePing();
});
ipcMain.on("metricsUnsub", async () => {
  cachedMetricsIsSubActive = false;
});

ipcMain.on("open-url", async (_event, arg) => {
  shell.openExternal(arg);
});
