import { AddMinerButton } from "./add-miner-button";
import { AddMinerModal } from "./add-miner-modal";
import { useAddMiner } from "./use-add-miner";

export function AddMiner({ withButton }: { withButton?: boolean }) {
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

  return (
    <>
      {withButton && <AddMinerButton onClick={() => setIsModalOpen(true)} />}
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
    </>
  );
}
