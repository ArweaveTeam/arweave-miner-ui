import Store from "electron-store";
import { ArweaveMinerUiConfig, ArweaveNodeConfig } from "../types/config";

const schema = {
  nodes: {
    type: "array" as const,
    items: {
      type: "object" as const,
      properties: {
        name: {
          type: "string" as const,
        },
        host: {
          type: "string" as const,
        },
        port: {
          type: "number" as const,
        },
        protocol: {
          type: "string" as const,
        },
      },
      required: ["name", "host", "port", "protocol"],
    },
  },
};

const store = new Store<ArweaveMinerUiConfig>({ schema });

export const configHandler = {
  configGetNodes: () => {
    console.log(store);
    return store.get("nodes") || [];
  },
  configAppendNode: (node: ArweaveNodeConfig) => {
    const currentNodes = store.get("nodes", []);
    const newNodes = [...currentNodes, node];
    store.set("nodes", newNodes);
  },
};
