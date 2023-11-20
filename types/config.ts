export interface ArweaveNodeConfig {
  host: string;
  port: number;
  protocol: string;
}

export interface ArweaveMinerUiConfig {
  nodes: ArweaveNodeConfig[];
}
