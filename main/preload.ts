import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { Metrics } from "../types/metrics";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  requestMetrics: function (): Promise<Metrics> {
    return new Promise((resolve: (res: Metrics) => void) => {
      const subscription = (_event: IpcRendererEvent, res: Metrics) => {
        ipcRenderer.off("metrics", subscription);
        resolve(res);
      };
      ipcRenderer.on("metrics", subscription);
      ipcRenderer.send("metrics", {});
    });
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
