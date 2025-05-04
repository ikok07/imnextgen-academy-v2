import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {z} from "zod";

export const settingsStateSchema = z.object({
    settingsOpened: z.boolean(),
})

export type SettingsState = z.infer<typeof settingsStateSchema>;

const initialState: SettingsState= {
    settingsOpened: false
};

export const settingsSlice = createSlice({
    name: "settings",
    reducerPath: "settings",
    initialState,
    reducers: {
        setSettingsOpened(state: SettingsState, action: PayloadAction<boolean>) {
            state.settingsOpened = action.payload;
        }
    }
});

export const settingsReducer = settingsSlice.reducer;
export const {
    setSettingsOpened
} = settingsSlice.actions;