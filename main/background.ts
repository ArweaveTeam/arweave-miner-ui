import path from "path";
import { app, ipcMain, shell } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import parsePrometheusTextFormat from 'parse-prometheus-text-format';
import { MinorParser } from "./types/Minor";

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
ipcMain.on("metrics", async (event) => {
  const res = await fetch('http://testnet-3.arweave.net:1984/metrics');
  const data = await res.text();
  
  const parsed: MinorParser[] = parsePrometheusTextFormat(data);
  let data_unpackaged = 0;
  let data_packaged = 0;
  const packing_item = parsed.find((item: MinorParser) => item.name === 'v2_index_data_size_by_packing');
  if (packing_item) {
    packing_item.metrics.forEach((item)=>{
      // unpacked storage modules are not involved in mining
      if (item.labels.packing == "unpacked") {
        data_unpackaged += +item.value;
      } else {
        data_packaged += +item.value;
      }
    })
  }
  const hash_rate = metric_string_parse(parsed.find((item: MinorParser) => item.name === 'average_network_hash_rate'));
  const earnings = metric_string_parse(parsed.find((item: MinorParser) => item.name === 'average_block_reward'));
  
  const vdf_step_time_milliseconds_bucket = parsed.find((item: MinorParser) => item.name === 'vdf_step_time_milliseconds');
  let vdf_time_lower_bound : number | null = null;
  if (vdf_step_time_milliseconds_bucket) {
    const buckets = (vdf_step_time_milliseconds_bucket.metrics[0] as unknown).buckets;
    for(const k in buckets) {
      const value = buckets[k];
      if (value === "0") continue;
      if (!vdf_time_lower_bound) {
        vdf_time_lower_bound = +k;
      }
    }
  }
  
  event.reply("metrics", {
    data_unpackaged,
    data_packaged,
    hash_rate,
    earnings,
    vdf_time_lower_bound,
  });
});

ipcMain.on("open-url", async (event, arg) => {
  shell.openExternal(arg);
});
