import { configureStore } from "@reduxjs/toolkit/react";
import {placeholderRedurcer} from "@/app/_store/slices/placeholder";

export const makeStore = () => {
    return configureStore({
        reducer: {
            placeholder: placeholderRedurcer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']