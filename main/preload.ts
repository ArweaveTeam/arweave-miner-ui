import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Metrics } from "../types/metrics";

ipcRenderer.on("metricsPush", (_event, msg) => {
  console.log("DEBUG metricsPush FE", msg);
});
const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  metricsSub: (handler: (_event: unknown, res: Metrics) => void) => {
    console.log("DEBUG metricsSub FE");
    ipcRenderer.on("metricsPush", handler);
    ipcRenderer.send("metricsSub", {});
  },
  metricsUnsub: (handler: (_event: unknown, res: Metrics) => void) => {
    console.log("DEBUG metricsUnsub FE");
    ipcRenderer.off("metricsPush", handler);
    ipcRenderer.send("metricsUnsub", {});
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;
