"use client"

import DashboardEventsListItem from "@/app/_components/dashboard/events/DashboardEventsListItem";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import { format } from "date-fns";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFullMeetingsForDate} from "@/app/dashboard/events/actions";
import {useCallback} from "react";
import {getFullMeetingStartTime} from "@/src/entities/utils/meetings/get-full-meeting-start-time.util";

export default function DashboardEventsList() {
    const {selectedDate} = useDashboardEvents();

    const {data: fullMeetingsQuery, isLoading, isError} = useErrorQuery({
        queryFn: () => getFullMeetingsForDate(selectedDate),
        queryKey: `full-meetings-${selectedDate}`
    });

    const meetingsListItems = useCallback(() => {
        if (isLoading) return <h1>LOADING...</h1>

        if (isError || !fullMeetingsQuery || !fullMeetingsQuery?.success) return <h1>ERROR...</h1>

        if (!fullMeetingsQuery.value) return <h1>NO ITEMS...</h1>

        return fullMeetingsQuery.value.sort((a, b) => {
            const aStartTime = getFullMeetingStartTime(a, selectedDate);
            if (!aStartTime) return -1;
            const bStartTime = getFullMeetingStartTime(b, selectedDate);
            if (!bStartTime) return 1;

            return aStartTime.hours - bStartTime.hours !== 0 ? aStartTime.hours - bStartTime.hours : aStartTime.minutes - bStartTime.minutes;
        }).map((fullMeeting, index) => {
            return <DashboardEventsListItem
                fullMeeting={fullMeeting}
                index={index}
                allItemsCount={fullMeetingsQuery.value.length}
                key={index}
            />
        })
    }, [selectedDate, isLoading]);

    return <Card className="relative flex flex-col w-full h-[35rem] pb-2">
        <div className="pointer-events-none absolute w-full h-[10rem] bottom-0 bg-gradient-to-t from-background to-transparent"/>
        <CardHeader className="py-3">
            <CardTitle className="text-xl">Налични срещи</CardTitle>
            <CardDescription>{format(selectedDate, "dd.MM.yyyy")}</CardDescription>
        </CardHeader>
        <CardContent className="overflow-scroll space-y-2">
            {meetingsListItems()}
        </CardContent>
    </Card>
}