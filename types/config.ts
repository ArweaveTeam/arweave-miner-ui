export interface ArweaveNodeConfig {
  id: string;
  name: string;
  host: string;
  port: number;
  protocol: string;
}

export type NewArweaveNodeConfig = Omit<ArweaveNodeConfig, "id">;

export interface ArweaveMinerUiConfig {
  nodes: ArweaveNodeConfig[];
}
