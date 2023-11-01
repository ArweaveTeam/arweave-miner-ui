import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { minorSlice } from "./minorSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [minorSlice.name]: minorSlice.reducer,
        },
        devTools: true,
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);