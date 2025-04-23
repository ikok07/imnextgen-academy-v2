import { configureStore } from "@reduxjs/toolkit/react";
import {dashboardSidebarReducer} from "@/app/_store/slices/dashboardSidebar";

export const makeStore = () => {
    return configureStore({
        reducer: {
            dashboardSidebar: dashboardSidebarReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']