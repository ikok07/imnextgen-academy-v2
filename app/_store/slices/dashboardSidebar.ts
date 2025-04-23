import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {z} from "zod";
import {Routes} from "@/app/_utils/nav/routes";

export const dashboardSidebarStateSchema = z.object({
    activeLinkId: z.string()
});

export type DashboardSidebarState = z.infer<typeof dashboardSidebarStateSchema>;

const initialState: DashboardSidebarState = {
    activeLinkId: Routes.home
}

const dashboardSidebar = createSlice({
    name: "dashboardSidebar",
    reducerPath: "dashboardSidebar",
    initialState,
    reducers: {
        setActiveLink(state: DashboardSidebarState, action: PayloadAction<string>) {state.activeLinkId = action.payload}
    }
});

export const dashboardSidebarReducer = dashboardSidebar.reducer;
export const {
    setActiveLink
} = dashboardSidebar.actions;