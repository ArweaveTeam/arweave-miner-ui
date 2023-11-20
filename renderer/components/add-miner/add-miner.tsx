import { AddMinerButton } from "./add-miner-button";
import { AddMinerModal } from "./add-miner-modal";
import { useAddMiner } from "./use-add-miner";

export function AddMiner() {
  const { isModalOpen, setIsModalOpen } = useAddMiner();

  return (
    <>
      <AddMinerButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && <AddMinerModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
