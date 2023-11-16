import React from "react";
import { fmtSize } from "../../util/minor";

interface ArrowProps {
  value: number | null;
  color: string;
}

export function TopArrow({ value, color }: ArrowProps) {
  const { value: displayValue, unit } = fmtSize(value || 0);
  return (
    <div className="absolute -top-5 left-1/2 flex">
      <div className="w-[1px] h-5 bg-gray-500"></div>

      <div className="w-[1px] h-[20px] bg-gray-500 transform rotate-90 ml-[9px] -mt-[10px]"></div>

      <div
        className="w-[10px] h-[20px] bg-[#A7A7A7] ml-[15px] -mt-[10px] group-hover:w-[15px]
                            transition-all duration-300"
        style={{ backgroundColor: color }}
      ></div>

      <div className="w-fit text-xs flex items-center gap-2 -mt-[20px] ml-[5px]">
        <span>{displayValue}</span> <span>{unit}</span>
      </div>
    </div>
  );
}

export function BottomArrow({ value, color }: ArrowProps) {
  const { value: displayValue, unit } = fmtSize(value || 0);
  return (
    <div className="absolute -bottom-7 left-1/2 flex">
      <div className="w-[1px] h-5 bg-gray-500 mt-5"></div>

      <div className="w-[1px] h-[20px] bg-gray-500 transform rotate-90 ml-[9px] mt-[30px]"></div>

      <div
        className="w-[10px] h-[20px] ml-[15px] mt-[30px] group-hover:w-[15px]
                             transition-all duration-300"
        style={{ backgroundColor: color }}
      ></div>

      <div className="w-fit text-xs flex items-center gap-2 mt-[30px] ml-[5px]">
        <span>{displayValue}</span> <span>{unit}</span>
      </div>
    </div>
  );
}
