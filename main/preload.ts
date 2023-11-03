import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  request : async function(channel: string, value: unknown) {
    return new Promise((resolve, reject)=>{
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => {
        ipcRenderer.off(channel, subscription);
        resolve(...args)
      };
      ipcRenderer.on(channel, subscription);
      ipcRenderer.send(channel, value);
    })
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
