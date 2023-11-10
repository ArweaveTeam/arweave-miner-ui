export type DataRelatedChart = {
  data_package: {
    size: number;
    unit: string;
  };
  storage_available: {
    size: number;
    unit: string;
  };
  total_size: {
    size: number;
    unit: string;
  };
};

export type TopArrow = {
  value: number;
  unit: string;
  color: string;
};

export type BottomArrow = {
  value: number;
  unit: string;
  color: string;
};
