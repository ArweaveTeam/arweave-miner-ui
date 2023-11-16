import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface MinorState {
  dataUnpacked: number | null;
  dataPacked: number | null;
  storageAvailable: number | null;
  weaveSize: number | null;
  hashRate: number | null;
  earnings: number | null;
  vdfTimeLowerBound: number | null;
}

const initialState: MinorState = {
  dataUnpacked: null,
  dataPacked: null,
  storageAvailable: null,
  weaveSize: null,
  hashRate: null,
  earnings: null,
  vdfTimeLowerBound: null,
};

export const minorSlice = createSlice({
  name: "minor",
  initialState,
  reducers: {
    setMetricsState(state, action) {
      state.dataUnpacked = action.payload.dataUnpacked;
      state.dataPacked = action.payload.dataUnpacked;
      state.storageAvailable = action.payload.storageAvailable;
      state.weaveSize = action.payload.weaveSize;
      state.hashRate = action.payload.hashRate;
      state.earnings = action.payload.earnings;
      state.vdfTimeLowerBound = action.payload.vdfTimeLowerBound;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.dataUnpacked,
        ...action.payload.dataPacked,
        ...action.payload.hashRate,
        ...action.payload.earnings,
      };
    },
  },
});

export const { setMetricsState } = minorSlice.actions;
export const selectMinorState = (state: AppState) => state.minor;
export default minorSlice.reducer;
