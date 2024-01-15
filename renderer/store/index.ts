import {
  Action,
  ThunkAction,
  ThunkDispatch,
  UnknownAction,
  configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { metricsSlice } from "./metricsSlice/metricsSlice";
import { configSlice } from "./configSlice/configSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [configSlice.name]: configSlice.reducer,
      [metricsSlice.name]: metricsSlice.reducer,
    },
    devTools: true,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunkDispatch = ThunkDispatch<AppStore, unknown, UnknownAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore);
