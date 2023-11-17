import { AppState } from "./index";

export const selectHashRate = (state: AppState) => ({
  hashRate: state.metrics.hashRate,
});

export const selectEarnings = (state: AppState) => ({
  earnings: state.metrics.earnings,
});

export const selectDataPacked = (state: AppState) => ({
  dataPacked: state.metrics.dataPacked,
});

export const selectDataUnpacked = (state: AppState) => ({
  dataUnpacked: state.metrics.dataUnpacked,
});

export const selectStorageAvailable = (state: AppState) => ({
  storageAvailable: state.metrics.storageAvailable,
});

export const selectWeaveSize = (state: AppState) => ({
  weaveSize: state.metrics.weaveSize,
});
