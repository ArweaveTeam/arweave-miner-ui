export function AddMinerModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="add-miner-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            {/* Modal Content */}
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Enter text"
            />
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => onClose()}
              // onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
