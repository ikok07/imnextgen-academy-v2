import {createSlice} from "@reduxjs/toolkit";

const placeholder = createSlice({
    name: "placeholder",
    reducerPath: "placeholder",
    initialState: {},
    reducers: {

    }
});

export const placeholderRedurcer = placeholder.reducer;
export const {} = placeholder.actions;