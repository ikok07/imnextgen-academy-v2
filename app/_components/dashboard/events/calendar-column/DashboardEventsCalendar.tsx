"use client"

import {Calendar} from "@/app/_components/ui/shadcn/calendar";
import {bg} from "date-fns/locale";
import {addMonths} from "date-fns";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";

type DashboardEventsCalendarProps = {
    onSelect: (date: Date) => void
}

export default function DashboardEventsCalendar({onSelect}: DashboardEventsCalendarProps) {
    const {selectedDate, setSelectedDate} = useDashboardEvents();

    return <Calendar
        mode="single"
        selected={new Date(selectedDate)}
        required={true}
        onSelect={(d) => {
            if (d) {
                setSelectedDate(d.getTime());
                onSelect(d);
            }
        }}
        // disabled={d => [0, 6].includes(d.getDay())}
        fromMonth={new Date()}
        toMonth={addMonths(new Date(), 1)}
        locale={bg}
    />
}