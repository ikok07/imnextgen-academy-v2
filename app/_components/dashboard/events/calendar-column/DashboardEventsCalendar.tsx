"use client"

import {Calendar} from "@/app/_components/ui/shadcn/calendar";
import {bg} from "date-fns/locale";
import {addHours, addMilliseconds, addMinutes, addMonths} from "date-fns";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import {UTCDate} from "@date-fns/utc";
import {getTimezoneOffset} from "date-fns-tz/getTimezoneOffset";

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
                // const utcStartDay = new Date(addMinutes(d, -d.getTimezoneOffset()))
                // setSelectedDate(utcStartDay.getTime());
                // onSelect(utcStartDay);
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