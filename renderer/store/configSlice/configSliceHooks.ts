import { useSelector } from "react-redux";
import { equals } from "ramda";
import { selectNodesFromConfig } from "./configSliceSelectors";

export const useConfigNodes = () => {
  return useSelector(selectNodesFromConfig, equals);
};
