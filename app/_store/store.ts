import { configureStore } from "@reduxjs/toolkit/react";
import {dashboardSidebarReducer} from "@/app/_store/slices/dashboardSidebar";
import {settingsReducer} from "@/app/_store/slices/settings";

export const makeStore = () => {
    return configureStore({
        reducer: {
            dashboardSidebar: dashboardSidebarReducer,
            settings: settingsReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']