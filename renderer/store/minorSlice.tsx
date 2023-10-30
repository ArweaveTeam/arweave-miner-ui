import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface MinorState {
    data_packaged: any;
    hash_rate: any;
    earnings: any;
}

const initialState: MinorState = {
    data_packaged: null,
    hash_rate: null,
    earnings: null,
};

export const minorSlice = createSlice({
    name: "minor",
    initialState,
    reducers: {
        // Action to set the minor data
        setMinorState(state, action) {
            state.data_packaged = action.payload.data_packaged;
            state.hash_rate = action.payload.hash_rate;
            state.earnings = action.payload.earnings;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.data_packaged,
                ...action.payload.hash_rate,
                ...action.payload.earnings,
            };
        },
    },
});

export const { setMinorState } = minorSlice.actions;
export const selectMinorState = (state: AppState) => state.minor
export default minorSlice.reducer;