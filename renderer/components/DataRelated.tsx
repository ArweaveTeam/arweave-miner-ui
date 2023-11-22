import React from "react";
import { filesize } from "filesize/dist/filesize.esm.js";
import DataRelatedChart from "./Charts/DataRelated";
import { ASSET } from "./Asset";
import {
  useDataPacked,
  useStorageAvailable,
  useWeaveSize,
} from "../store/metricsSlice/metricsSliceHooks";

export default function DataRelated() {
  const { dataPacked } = useDataPacked();
  const { storageAvailable } = useStorageAvailable();
  const { weaveSize } = useWeaveSize();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleOpen = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const calculateSize = React.useCallback(
    (size: number | undefined): string => {
      return filesize(size || 0, { standard: "si" });
    },
    [dataPacked, storageAvailable, weaveSize],
  );

  return (
    <div id="sub-section-1-1" className={` border-black ${isOpen ? "" : "border-b"}`}>
      <div className="border border-b-0 border-black py-2 px-4 flex items-center justify-between">
        <h3 className="text-lg font-normal mb-2">Data Related</h3>

        <button className="border border-black px-5 rounded-full bg-white" onClick={handleOpen}>
          <img
            src={ASSET.ArrowSvg}
            alt="arrow"
            className={`w-4 h-4 transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"}`}
          />
        </button>
      </div>

      <div
        className={`w-full flex transition-all duration-300 ${
          isOpen ? "h-auto  opacity-100" : "h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="w-2/5 flex flex-col items-center px-10">
          <DataRelatedChart
            dataPacked={dataPacked || 0}
            storageAvailable={storageAvailable || 0}
            weaveSize={weaveSize || 0}
          />
        </div>

        <div className="w-3/5 border border-b-0 border-black flex">
          <div className="w-1/2">
            <div className="border-r border-b border-black flex items-center pl-2 py-1 bg-white">
              <div className="h-3 w-3 bg-[#7BF05E] mr-2 rounded-sm"></div>
              <h3 className="text-sm">Data Packed</h3>
            </div>
            <div className="border-r border-b border-black">
              <div className="w-full flex h-20 bg-white">
                <span className="w-full h-full flex items-center justify-center text-xl">
                  {calculateSize(dataPacked)}
                </span>
                <span className="w-full h-full flex items-center justify-center border-l border-dashed border-black text-xl">
                  {dataPacked != null && weaveSize != null
                    ? `~ ${((dataPacked / weaveSize) * 100).toFixed(2)}%`
                    : "?"}
                </span>
              </div>

              <div className="w-full h-20 border-black border-t flex items-center pl-2">
                <span className="h-3 w-3 bg-[#989797] mr-2 rounded-sm"></span>
                <span className="h-full flex items-center justify-center text-sm">
                  Total Weave Size
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="border-b border-black flex items-center pl-2 py-1 bg-white">
              <div className="h-3 w-3 bg-[#1D2988] mr-2 rounded-sm"></div>
              <h3 className="text-sm">Storage Available</h3>
            </div>
            <div className="border-b border-black">
              <div className="w-full flex h-20 bg-white">
                <span className="w-full h-full flex items-center justify-center text-xl">
                  {calculateSize(storageAvailable)}
                </span>
                <span className="w-full h-full flex items-center justify-center border-l border-dashed border-black text-xl">
                  {storageAvailable != null && weaveSize != null
                    ? `~ ${((storageAvailable / weaveSize) * 100).toFixed(2)}%`
                    : "?"}
                </span>
              </div>

              <div className="w-full flex h-20 border-t border-black">
                <span className="w-full h-full flex items-center justify-center text-xl">
                  {calculateSize(weaveSize)}
                </span>
                <span className="w-full h-full flex items-center justify-center border-l border-dashed border-black text-xl">
                  100%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
