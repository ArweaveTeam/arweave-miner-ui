import { ipcMain } from "electron";
import Store from "electron-store";
import { ArweaveMinerUiConfig, ArweaveNodeConfig } from "../types/config";

const schema = {
  nodes: {
    type: "array" as const,
  },
};

const store = new Store<ArweaveMinerUiConfig>({ schema });

ipcMain.on("configGetNodes", (): ArweaveNodeConfig[] => {
  return store.get("nodes", []);
});

ipcMain.on("configAppendNode", (_, node: ArweaveNodeConfig): void => {
  const currentNodes = store.get("nodes", []);
  const newNodes = [...currentNodes, node];
  store.set("nodes", newNodes);
});
