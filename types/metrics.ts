import { ArweaveNodeConfig } from "./config"
export interface SetMetricsStateActionPayload {
  dataUnpacked: number | null;
  dataPacked: number | null;
  storageAvailable: number | null;
  weaveSize: number | null;
  hashRate: number | null;
  earnings: number | null;
  vdfTimeLowerBound: number | null;
  node : ArweaveNodeConfig;
}
