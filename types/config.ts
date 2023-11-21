export interface ArweaveNodeConfig {
  name: string;
  host: string;
  port: number;
  protocol: string;
}

export interface ArweaveMinerUiConfig {
  nodes: ArweaveNodeConfig[];
}
