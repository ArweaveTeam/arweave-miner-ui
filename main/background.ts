import path from "path";
import { app, ipcMain, shell } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import parsePrometheusTextFormat from "parse-prometheus-text-format";
import { MinorParser } from "./types/Minor";
import { Metrics } from "../types/metrics";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
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

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

function metric_string_parse(item): number | null {
  if (!item) return null;
  return +item.metrics[0].value;
}

// better dev quality, temp solution
async function getMetrics(): Promise<Metrics> {
  console.log("DEBUG: getMetrics start");
  const res = await fetch("http://testnet-3.arweave.net:1984/metrics");
  const data = await res.text();

  const parsed: MinorParser[] = parsePrometheusTextFormat(data);
  let dataUnpacked = 0;
  let dataPacked = 0;
  let storageAvailable = 0;
  const packing_item = parsed.find(
    (item: MinorParser) => item.name === "v2_index_data_size_by_packing",
  );
  if (packing_item) {
    packing_item.metrics.forEach((item) => {
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
  const hashRate = metric_string_parse(
    parsed.find((item: MinorParser) => item.name === "average_network_hash_rate"),
  );
  const earnings = metric_string_parse(
    parsed.find((item: MinorParser) => item.name === "average_block_reward"),
  );

  const vdf_step_time_milliseconds_bucket = parsed.find(
    (item: MinorParser) => item.name === "vdf_step_time_milliseconds",
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
  const weaveSize = metric_string_parse(
    parsed.find((item: MinorParser) => item.name === "weave_size"),
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
  };
}

const cached_metrics: Promise<Metrics> = getMetrics();
ipcMain.on("metrics", async (event) => {
  event.reply("metrics", await cached_metrics);
});

ipcMain.on("open-url", async (event, arg) => {
  shell.openExternal(arg);
});
