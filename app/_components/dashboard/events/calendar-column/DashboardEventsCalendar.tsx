"use client"

import {Calendar} from "@/app/_components/ui/shadcn/calendar";
import {bg} from "date-fns/locale";
import {addMonths} from "date-fns";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";

export default function DashboardEventsCalendar() {
    const {selectedDate, setSelectedDate} = useDashboardEvents();

    return <Calendar
        mode="single"
        selected={new Date(selectedDate)}
        required={true}
        onSelect={(d) => d && setSelectedDate(d.getTime())}
        // disabled={d => [0, 6].includes(d.getDay())}
        fromMonth={addMonths(new Date(), -1)}
        toMonth={addMonths(new Date(), 1)}
        locale={bg}
    />
}