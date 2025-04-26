import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {z} from "zod";
import {Routes} from "@/app/_utils/nav/routes";

export const dashboardSidebarStateSchema = z.object({
    activeLinkId: z.string(),
    sidebarLoaded: z.boolean(),
    dashboardMobileSidebarOpen: z.boolean()
});

export type DashboardSidebarState = z.infer<typeof dashboardSidebarStateSchema>;

const initialState: DashboardSidebarState = {
    activeLinkId: Routes.home,
    sidebarLoaded: false,
    dashboardMobileSidebarOpen: false
}

const dashboardSidebar = createSlice({
    name: "dashboardSidebar",
    reducerPath: "dashboardSidebar",
    initialState,
    reducers: {
        setActiveLink(state: DashboardSidebarState, action: PayloadAction<string>) {state.activeLinkId = action.payload},
        setDashboardLoaded(state: DashboardSidebarState, action: PayloadAction<boolean>) {state.sidebarLoaded = action.payload},
        setDashboardMobileSidebarOpen(state: DashboardSidebarState, action: PayloadAction<boolean>) {state.dashboardMobileSidebarOpen = action.payload}
    }
});

export const dashboardSidebarReducer = dashboardSidebar.reducer;
export const {
    setActiveLink,
    setDashboardLoaded,
    setDashboardMobileSidebarOpen
} = dashboardSidebar.actions;