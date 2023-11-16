import { DataSize } from "../../types/generic";
import { BottomArrow, TopArrow } from "./Arrows";

interface DataRelatedChartProps {
  dataPackage: DataSize;
  storageAvailable: DataSize;
  totalWeaveSize: DataSize;
}

export default function DataRelatedChart({
  dataPackage,
  storageAvailable,
  totalWeaveSize,
}: DataRelatedChartProps) {
  return (
    <div className="w-96 h-20 flex items-center mt-20">
      <div
        className="bg-[#7BF05E] hover:bg-[#6ad050] h-full cursor-pointer relative group"
        style={{
          width: "2%",
        }}
      >
        <TopArrow value={dataPackage.value} unit={dataPackage.unit} color="#7BF05E" />
      </div>

      <div
        className="bg-[#1D2988] hover:bg-[#1d1d88c8] h-full cursor-pointer relative group"
        style={{
          width: "4%",
        }}
      >
        <BottomArrow value={storageAvailable.value} unit={storageAvailable.unit} color="#1D2988" />
      </div>

      <div className="w-full bg-[#A7A7A7] hover:bg-[#989797] h-full cursor-pointer relative group">
        <TopArrow value={totalWeaveSize.value} unit={totalWeaveSize.unit} color="#A7A7A7" />
      </div>
    </div>
  );
}
