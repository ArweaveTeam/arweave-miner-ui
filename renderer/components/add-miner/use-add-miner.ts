import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { appendNode } from "../../store/configSlice/configSlice";
import { NewArweaveNodeConfig } from "../../../types/config";

export const useAddMiner = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMinerName, setNewMinerName] = useState("");
  const [newMinerHost, setNewMinerHost] = useState("");
  const [newMinerPort, setNewMinerPort] = useState(1984);
  const [newMinerProtocol, setNewMinerProtocol] = useState("http");

  const newMinerData: NewArweaveNodeConfig = {
    name: newMinerName,
    host: newMinerHost,
    port: newMinerPort,
    protocol: newMinerProtocol,
  };

  const handleAddMiner = useCallback(() => {
    dispatch(appendNode(newMinerData));
    setIsModalOpen(false);
  }, [dispatch, newMinerData, setIsModalOpen]);

  const handleNewMinerNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setNewMinerName(event.currentTarget.value),
    [setNewMinerName],
  );

  const handleNewMinerHostChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setNewMinerHost(event.currentTarget.value),
    [setNewMinerHost],
  );

  const handleNewMinerPortChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      !Number.isNaN(event.currentTarget.value) &&
      setNewMinerPort(Number(event.currentTarget.value)),
    [setNewMinerPort],
  );

  const handleNewMinerProtocolChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setNewMinerProtocol(event.currentTarget.value),
    [setNewMinerProtocol],
  );

  return {
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
  };
};
