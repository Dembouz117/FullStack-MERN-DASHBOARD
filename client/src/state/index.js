import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e"
};

//The reducers contain functions that simplify global states
//You will access these slices via state.global etc
//From there, you will be able to access the properties such as mode. For example, state.global.mode

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        }
    }
})


//Look up Redux docs for createSlice
export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;

