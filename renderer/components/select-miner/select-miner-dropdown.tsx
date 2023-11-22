import { useSelectedNode } from "../../store/configSlice/configSliceHooks";

export function SelectMinerDropdown() {
  const selectedNode = useSelectedNode();

  return (
    <button
      className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-200"
      type="button"
    >
      <span>{selectedNode?.name || "loading..."}</span>
    </button>
  );
}
