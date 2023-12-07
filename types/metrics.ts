import { ArweaveNodeConfig } from "./config"
export interface SetMetricsStateActionPayload {
  dataUnpacked: number | null;
  dataPacked: number | null;
  storageAvailable: number | null;
  hashCountWatermark: number;
  hashRate: number | null;
  hashRateHistory: HistoryPoint[];
  weaveSize: number | null;
  networkHashRate: number | null;
  avgBlockReward: number | null;
  earnings: number | null;
  vdfTimeLowerBound: number | null;
  node : ArweaveNodeConfig;
  ts: number;
}
export interface HistoryPoint {
  value : number;
  ts : number;
}