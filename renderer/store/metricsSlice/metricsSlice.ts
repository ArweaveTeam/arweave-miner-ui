import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SetMetricsStateActionPayload, HistoryPoint } from "../../../types/metrics";
import { AppState } from "../index";

// Type for our state
export interface MetricsSliceReducerState {
  dataUnpacked: number | undefined;
  dataPacked: number | undefined;
  storageAvailable: number | undefined;
  weaveSize: number | undefined;
  hashRate: number | undefined;
  hashRateHistory: HistoryPoint[];
  avgBlockReward: number | undefined;
  earnings: number | undefined;
  vdfTimeLowerBound: number | undefined;
}

const initialMetricsState: MetricsSliceReducerState = {
  dataUnpacked: undefined,
  dataPacked: undefined,
  storageAvailable: undefined,
  weaveSize: undefined,
  hashRate: undefined,
  hashRateHistory: [],
  avgBlockReward: undefined,
  earnings: undefined,
  vdfTimeLowerBound: undefined,
};

export const metricsSlice = createSlice({
  name: "metrics",
  initialState: initialMetricsState,
  reducers: {
    setMetricsState(
      state: MetricsSliceReducerState,
      action: { payload: SetMetricsStateActionPayload },
    ) {
      const {
        dataUnpacked,
        dataPacked,
        storageAvailable,
        weaveSize,
        hashRate,
        hashRateHistory,
        avgBlockReward,
        earnings,
        vdfTimeLowerBound,
      } = action.payload;
      state.dataUnpacked = dataUnpacked ?? undefined;
      state.dataPacked = dataPacked ?? undefined;
      state.storageAvailable = storageAvailable ?? undefined;
      state.weaveSize = weaveSize ?? undefined;
      state.hashRate = hashRate ?? undefined;
      state.hashRateHistory = hashRateHistory ?? undefined;
      state.avgBlockReward = avgBlockReward ?? undefined;
      state.earnings = earnings ?? undefined;
      state.vdfTimeLowerBound = vdfTimeLowerBound ?? undefined;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state) => {
      return {
        ...state,
      };
    });
  },
});

export const { setMetricsState } = metricsSlice.actions;
export const selectMinorState = (state: AppState) => state.metrics;
export default metricsSlice.reducer;
