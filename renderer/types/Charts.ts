export type ValueWithMeasureValue = {
  value: number;
  display_value: string;
  unit: string;
};
export type DataRelatedChart = {
  data_package: ValueWithMeasureValue;
  storage_available: ValueWithMeasureValue;
  total_size: ValueWithMeasureValue;
};

// TODO merge into 1 type
export type TopArrow = {
  value: string;
  unit: string;
  color: string;
};

export type BottomArrow = {
  value: string;
  unit: string;
  color: string;
};
