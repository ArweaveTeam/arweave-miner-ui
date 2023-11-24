import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../store";
import { useConfigNodes, useSelectedNode } from "../../store/configSlice/configSliceHooks";
import { selectNode } from "../../store/configSlice/configSlice";
import { useAddMiner } from "../add-miner/use-add-miner";
import { AddMinerModal } from "../add-miner/add-miner-modal";

export function SelectMinerDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedNode = useSelectedNode();
  const configuredNodes = useConfigNodes();
  const {
    isModalOpen,
    newMinerName,
    newMinerHost,
    newMinerPort,
    newMinerProtocol,
    handleAddMiner,
    handleNewMinerNameChange,
    handleNewMinerHostChange,
    handleNewMinerPortChange,
    handleNewMinerProtocolChange,
    setIsModalOpen,
  } = useAddMiner();

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      if (selectedNode?.id !== nodeId) {
        dispatch(selectNode(nodeId));
      }
      setIsDropdownOpen(false);
    },
    [dispatch],
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    },
    [setIsDropdownOpen],
  );

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-200"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{selectedNode?.name || "loading..."}</span>
      </button>
      {isDropdownOpen && (
        <div className="absolute z-10 top-0 right-0 mt-12 w-56 rounded-md shadow-lg bg-gray-950 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {configuredNodes.map((node) => (
              <a
                key={node.id}
                href="#"
                className="block px-2 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
                role="menuitem"
                onClick={(event) => {
                  if (event.target instanceof HTMLButtonElement) {
                    event.preventDefault();
                  } else {
                    handleSelectNode(node.id);
                  }
                }}
              >
                {node.id === selectedNode?.id ? <span>✔</span> : <span className="w-2">·</span>}{" "}
                {node.name}{" "}
                <button
                  className="rounded-full p-0 px-2 hover:bg-gray-500 border-gray-200 border-solid border-2"
                  onClick={() => window.alert("TODO: edit miner")}
                >
                  &#x270E;
                </button>
                <button
                  className="rounded-full p-0 px-2 ml-2 hover:bg-gray-500 border-gray-200 border-solid border-2"
                  onClick={() => window.alert("TODO: delete miner")}
                >
                  &#x1F5D1;
                </button>
              </a>
            ))}
            <hr />
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white"
              role="menuitem"
              onClick={() => {
                setIsDropdownOpen(false);
                setIsModalOpen(true);
              }}
            >
              <span>+</span> Add new miner
            </a>
          </div>
        </div>
      )}
      {isModalOpen && (
        <AddMinerModal
          onClose={() => setIsModalOpen(false)}
          onAddMiner={handleAddMiner}
          nameValue={newMinerName}
          hostnameValue={newMinerHost}
          portValue={newMinerPort}
          protocolValue={newMinerProtocol}
          onNameChange={handleNewMinerNameChange}
          onHostnameChange={handleNewMinerHostChange}
          onPortChange={handleNewMinerPortChange}
          onProtocolChange={handleNewMinerProtocolChange}
        />
      )}
    </div>
  );
}
