"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {z} from "zod";
import {startOfDay} from "date-fns";

export const dashboardEventsStateSchema = z.object({
    selectedDate: z.number(),
    setSelectedDate: z.custom<(date: number) => void>()
});

export type DashboardEventsState = z.infer<typeof dashboardEventsStateSchema>;

const DashboardEventsContext = createContext<DashboardEventsState | null>(null);


type DashboardEventsProviderProps = {
    children: ReactNode
}

export default function DashboardEventsProvider({children}: DashboardEventsProviderProps) {
    const [selectedDate, setSelectedDate] = useState(startOfDay(Date.now()).valueOf());

    function updateSelectedDate(date: number) {
        setSelectedDate(date);
    }

    return <DashboardEventsContext.Provider value={{
        selectedDate,
        setSelectedDate: updateSelectedDate
    }}>
        {children}
    </DashboardEventsContext.Provider>
}

export function useDashboardEvents() {
    const context= useContext(DashboardEventsContext);
    if (!context) {
        throw new Error("useDashboardEvents must be used inside DashboardEventsProvider!");
    }
    return context;
}