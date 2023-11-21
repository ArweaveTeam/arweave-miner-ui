import React from "react";

export function AddMinerModal({
  nameValue,
  hostnameValue,
  portValue,
  protocolValue,
  onClose,
  onAddMiner,
  onNameChange,
  onHostnameChange,
  onPortChange,
  onProtocolChange,
}: {
  nameValue: string;
  hostnameValue: string;
  portValue: number;
  protocolValue: string;
  onClose: () => void;
  onAddMiner: () => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHostnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProtocolChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="add-miner-modal"
    >
      <div
        className="relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white"
        style={{ width: "32rem" }}
      >
        <div className="mt-3 text-center">
          <div className="mx-auto flex flex-col items-center justify-center w-96 rounded-full">
            {/* Modal Content */}
            <div className="w-full">
              <input
                type="text"
                className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
                placeholder="Give your miner a name"
                value={nameValue}
                onChange={onNameChange}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
                placeholder="Enter Miner Hostname"
                value={hostnameValue}
                onChange={onHostnameChange}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
                placeholder="Enter Miner Port Number"
                value={portValue}
                onChange={onPortChange}
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
                placeholder="Enter Miner Protocol"
                value={protocolValue}
                onChange={onProtocolChange}
              />
            </div>
            <div>
              <button
                className="px-4 py-2 mr-6 bg-black text-white rounded hover:bg-white hover:text-black hover:border-black border-2"
                onClick={() => onAddMiner()}
              >
                Add Miner
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black hover:border-black border-2"
                onClick={() => onClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
