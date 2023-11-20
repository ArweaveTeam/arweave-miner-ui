export function AddMinerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-200"
      type="button"
    >
      <img src="/wallet.svg" />
      <span>Add Miner</span>
    </button>
  );
}
