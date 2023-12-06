import { useSelector } from "react-redux";
import {
  selectHashRate,
  selectAvgBlockReward,
  selectEarnings,
  selectDataPacked,
  selectDataUnpacked,
  selectStorageAvailable,
  selectWeaveSize,
} from "./metricsSliceSelectors";

export const useHashRate = () => {
  return useSelector(selectHashRate, (prev, current) => {
    return prev.hashRate === current.hashRate;
  });
};

export const useAvgBlockReward = () => {
  return useSelector(selectAvgBlockReward, (prev, current) => {
    return prev.avgBlockReward === current.avgBlockReward;
  });
};

export const useEarnings = () => {
  return useSelector(selectEarnings, (prev, current) => {
    return prev.earnings === current.earnings;
  });
};

export const useDataPacked = () => {
  return useSelector(selectDataPacked, (prev, current) => {
    return prev.dataPacked === current.dataPacked;
  });
};

export const useDataUnpacked = () => {
  return useSelector(selectDataUnpacked, (prev, current) => {
    return prev.dataUnpacked === current.dataUnpacked;
  });
};

export const useStorageAvailable = () => {
  return useSelector(selectStorageAvailable, (prev, current) => {
    return prev.storageAvailable === current.storageAvailable;
  });
};

export const useWeaveSize = () => {
  return useSelector(selectWeaveSize, (prev, current) => {
    return prev.weaveSize === current.weaveSize;
  });
};
