import { BottomArrow, TopArrow } from "./Arrows";

interface DataRelatedChartProps {
  dataPacked: number | null;
  storageAvailable: number | null;
  weaveSize: number | null;
}

export default function DataRelatedChart({
  dataPacked,
  storageAvailable,
  weaveSize,
}: DataRelatedChartProps) {
  // NOTE maybe this component should pick all stuff from storage directly
  return (
    <div className="w-96 h-20 flex items-center mt-20">
      <div
        className="bg-[#7BF05E] hover:bg-[#6ad050] h-full cursor-pointer relative group"
        style={{
          width: "2%",
        }}
      >
        <TopArrow value={dataPacked} color="#7BF05E" />
      </div>

      <div
        className="bg-[#1D2988] hover:bg-[#1d1d88c8] h-full cursor-pointer relative group"
        style={{
          width: "4%",
        }}
      >
        <BottomArrow value={storageAvailable} color="#1D2988" />
      </div>

      <div className="w-full bg-[#A7A7A7] hover:bg-[#989797] h-full cursor-pointer relative group">
        <TopArrow value={weaveSize} color="#A7A7A7" />
      </div>
    </div>
  );
}
