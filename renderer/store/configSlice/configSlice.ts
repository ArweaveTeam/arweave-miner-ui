import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ArweaveMinerUiConfig,
  ArweaveNodeConfig,
  NewArweaveNodeConfig,
} from "../../../types/config";

interface ConfigState {
  selectedNode: string | undefined;
  nodes: ArweaveMinerUiConfig["nodes"];
}

const initialState = { nodes: [], selectedNode: undefined } as ConfigState;

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<ArweaveNodeConfig[]>) {
      state.nodes = action.payload;
      if (state.selectedNode === undefined && action.payload.length > 0) {
        state.selectedNode = action.payload[0].id;
        window.ipc.setSelectedNodeById(state.selectedNode);
      }
    },
    appendNode(state, action: PayloadAction<NewArweaveNodeConfig>) {
      const newNode = window.ipc.configAppendNode(action.payload);
      state.nodes.push(newNode);
    },
  },
});

export const getNodes = createAsyncThunk("config/getNodes", async (_, { dispatch }) => {
  const answer = window.ipc.configGetNodes();
  dispatch(configSlice.actions.setNodes(answer));
});

export const { appendNode } = configSlice.actions;
export default configSlice.reducer;