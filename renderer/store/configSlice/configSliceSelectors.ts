import { AppState } from "../index";

export const selectNodesFromConfig = (state: AppState) => state.config.nodes;
export const selectSelectedNode = (state: AppState) => state.config.selectedNode;
