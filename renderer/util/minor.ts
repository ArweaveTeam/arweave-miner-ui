import { ValueWithMeasureValue } from "../types/Charts";
const size_mv_list = ["B", "KB", "MB", "GB", "TB", "PB"];

// rough port from
// https://github.com/virdpool/ar_miner_ui_playground/blob/e28a8034bd367a35fe40878c90c606e456b2346f/electron_app/htdocs/util/fmt.coffee#L6
// TODO refactor
export function fmtSize(orig_value: number): ValueWithMeasureValue {
  let idx = 0;
  let value = orig_value;
  while (idx < size_mv_list.length) {
    const unit = size_mv_list[idx];
    if (value < 900 || idx + 1 >= size_mv_list.length) {
      if (idx === 0) {
        return {
          value: orig_value,
          display_value: value.toString(),
          unit,
        };
      } else {
        return {
          value: orig_value,
          display_value: value.toFixed(2),
          unit,
        };
      }
    }
    value /= 1024;
    idx++;
  }
  return {
    value: orig_value,
    display_value: "0",
    unit: "B",
  };
}

const sizeNetList = ["Bps", "KBps", "MBps", "GBps", "TBps", "PBps"];
export function fmtNetSpeed(orig_value: number) {
  let idx = 0;
  let value = orig_value;
  while (idx < sizeNetList.length) {
    const unit = sizeNetList[idx];
    if (value < 900 || idx + 1 >= sizeNetList.length) {
      if (idx === 0) {
        return {
          value: orig_value,
          display_value: value.toString(),
          unit,
        };
      } else {
        return {
          value: orig_value,
          display_value: value.toFixed(2),
          unit,
        };
      }
    }
    value /= 1024;
    idx++;
  }
  return {
    value: orig_value,
    display_value: "0",
    unit: "Bps",
  };
}

export function fmtHashrate(orig_value: number) {
  return {
    value: orig_value,
    display_value: orig_value.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    unit: "H/s",
  };
}
