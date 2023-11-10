export type MinorParser = {
  name: string;
  help: string;
  type: string;
  metrics: {
    value: string;
    labels: {
      [key: string]: string;
    };
  }[];
};

export type Metrics = {
  data_packaged: number;
  data_unpackaged: number;
  earnings: number;
  hash_rate: number;
  vdf_time_lower_bound: number;
};
