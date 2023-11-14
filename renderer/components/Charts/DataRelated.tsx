import { BottomArrow, DataRelatedChart, TopArrow } from "../../types/Charts";

export default function DataRelated({
  data_package,
  storage_available,
  total_size,
}: DataRelatedChart) {
  return (
    <div className="w-96 h-20 flex items-center mt-20">
      <div
        className="bg-[#7BF05E] hover:bg-[#6ad050] h-full cursor-pointer relative group"
        style={{
          width: "2%",
        }}
      >
        <TopArrow value={data_package.display_value} unit={data_package.unit} color="#7BF05E" />
      </div>

      <div
        className="bg-[#1D2988] hover:bg-[#1d1d88c8] h-full cursor-pointer relative group"
        style={{
          width: "4%",
        }}
      >
        <BottomArrow
          value={storage_available.display_value}
          unit={storage_available.unit}
          color="#1D2988"
        />
      </div>

      <div className="w-full bg-[#A7A7A7] hover:bg-[#989797] h-full cursor-pointer relative group">
        <TopArrow value={total_size.display_value} unit={total_size.unit} color="#A7A7A7" />
      </div>
    </div>
  );
}

function TopArrow({ value, unit, color }: TopArrow) {
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
        <span>{value}</span> <span>{unit}</span>
      </div>
    </div>
  );
}

function BottomArrow({ value, unit, color }: BottomArrow) {
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
        <span>{value}</span> <span>{unit}</span>
      </div>
    </div>
  );
}
