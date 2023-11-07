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
