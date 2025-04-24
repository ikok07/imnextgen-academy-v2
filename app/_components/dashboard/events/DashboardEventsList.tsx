"use client"

import DashboardEventsListItem from "@/app/_components/dashboard/events/DashboardEventsListItem";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import { format } from "date-fns";

export default function DashboardEventsList() {
    const {selectedDate} = useDashboardEvents();
    console.log(new Date(selectedDate).getDay())

    return <Card className="relative flex flex-col w-full h-[35rem] pb-2">
        <div className="absolute w-full h-[10rem] bottom-0 bg-gradient-to-t from-background to-transparent"/>
        <CardHeader className="py-3">
            <CardTitle className="text-xl">Налични срещи</CardTitle>
            <CardDescription>{format(selectedDate, "dd.MM.yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="overflow-scroll space-y-2 pb-[10rem]">
            <DashboardEventsListItem />
        </CardContent>
    </Card>
}