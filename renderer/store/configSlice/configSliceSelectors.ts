import { AppState } from "../index";

export const selectNodesFromConfig = (state: AppState) => state.config.nodes;
