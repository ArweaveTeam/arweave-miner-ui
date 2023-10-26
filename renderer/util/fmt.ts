export const sizeMvList = [".B", "KB", "MB", "GB", "TB", "PB"];

export const fmtSize = (valueBn: string) => {
  let value = Number(valueBn);
  let idx = 0;

  while (true) {
    const mv = sizeMvList[idx];
    if (value < 900 || idx + 1 >= sizeMvList.length) {
      if (idx === 0) {
        return `${value} ${mv}`;
      } else {
        return `${value.toFixed(2)} ${mv}`;
      }
    }
    value /= 1024;
    idx++;
  }
};

export const sizeNetList = [".Bps", "KBps", "MBps", "GBps", "TBps", "PBps"];

export const fmtNetSpeed = (value: number) => {
  let idx = 0;

  while (true) {
    const mv = sizeNetList[idx];
    if (value < 900 || idx + 1 >= sizeNetList.length) {
      return `${value.toFixed(2)} ${mv}`;
    }
    value /= 1024;
    idx++;
  }
};

export const fmtHashrate = (t: number) => {
  return t.toLocaleString(undefined, { maximumFractionDigits: 2 });
};
