import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";
import { ArweaveMinerUiConfig, ArweaveNodeConfig, NewArweaveNodeConfig } from "../types/config";

export let selectedNode: ArweaveNodeConfig | undefined;

const schema = {
  nodes: {
    type: "array" as const,
    items: {
      type: "object" as const,
      properties: {
        id: {
          type: "string" as const,
        },
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
    return store.get("nodes") || [];
  },
  configAppendNode: (node: NewArweaveNodeConfig): ArweaveNodeConfig => {
    const newUuid = uuidv4();
    const newNode: ArweaveNodeConfig = { id: newUuid, ...node };
    const currentNodes = store.get("nodes", []);
    const newNodes = [...currentNodes, newNode];
    store.set("nodes", newNodes);
    return newNode;
  },
  setSelectedNodeById: (id: string) => {
    const currentNodes = store.get("nodes", []);
    const node = currentNodes.find((node) => node.id === id);
    if (node) {
      selectedNode = node;
    }
  },
};
