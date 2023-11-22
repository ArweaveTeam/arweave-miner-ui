import { useSelector } from "react-redux";
import { equals } from "ramda";
import { selectNodesFromConfig, selectSelectedNode } from "./configSliceSelectors";

export const useConfigNodes = () => {
  return useSelector(selectNodesFromConfig, equals);
};

export const useSelectedNode = () => {
  const nodes = useConfigNodes();
  const selectedNode = useSelector(selectSelectedNode);
  return nodes.find((node) => node.id === selectedNode);
};
