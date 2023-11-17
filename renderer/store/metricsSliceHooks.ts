import { useSelector } from "react-redux";
import {
  selectHashRate,
  selectEarnings,
  selectDataPacked,
  selectDataUnpacked,
  selectStorageAvailable,
  selectWeaveSize,
} from "./selectors";

export const useHashRate = () => {
  return useSelector(selectHashRate);
};

export const useEarnings = () => {
  return useSelector(selectEarnings);
};

export const useDataPacked = () => {
  return useSelector(selectDataPacked);
};

export const useDataUnpacked = () => {
  return useSelector(selectDataUnpacked);
};

export const useStorageAvailable = () => {
  return useSelector(selectStorageAvailable);
};

export const useWeaveSize = () => {
  return useSelector(selectWeaveSize);
};
