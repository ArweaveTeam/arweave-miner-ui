import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ArweaveMinerUiConfig, ArweaveNodeConfig } from "../../../types/config";

interface ConfigState {
  nodes: ArweaveMinerUiConfig["nodes"];
}

const initialState = { nodes: [] } as ConfigState;

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<ArweaveNodeConfig[]>) {
      state.nodes = action.payload;
    },
    appendNode(state, action: PayloadAction<ArweaveNodeConfig>) {
      window.ipc.configAppendNode(action.payload);
      state.nodes.push(action.payload);
    },
  },
});

export const getNodes = createAsyncThunk("config/getNodes", async (_, { dispatch }) => {
  const answer = window.ipc.configGetNodes();
  dispatch(configSlice.actions.setNodes(answer));
});

export const { appendNode } = configSlice.actions;
export default configSlice.reducer;
