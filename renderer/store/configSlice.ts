import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ArweaveMinerUiConfig, ArweaveNodeConfig } from "../../types/config";

interface ConfigState {
  nodes: ArweaveMinerUiConfig["nodes"];
}

const initialState = { nodes: [] } as ConfigState;

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    appendNode(state, action: PayloadAction<ArweaveNodeConfig>) {
      window.ipc.send("configAppendNode", action.payload);
      state.nodes.push(action.payload);
    },
  },
});

export const { appendNode } = configSlice.actions;
export default configSlice.reducer;
