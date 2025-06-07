import {hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds} from "date-fns";
import {BookedCalendarEvent} from "@/src/entities/models/meetings/booked-calendar-event";

type Options = {
    dateMs: number,
    startHour: number,
    startMinutes: number,
    totalDurationMinutes: number,
    singleAppointmentDurationMinutes: number,
    bookedMeetingsDates: BookedCalendarEvent[]
}

export function getCalendarAvailableTimes({dateMs, startHour, startMinutes, totalDurationMinutes, singleAppointmentDurationMinutes, bookedMeetingsDates}: Options) {
    const startDate = dateMs + hoursToMilliseconds(startHour) + minutesToMilliseconds(startMinutes);

    const availableTimes: Set<number> = new Set();

    for (let i = 0; i < Math.round(totalDurationMinutes / singleAppointmentDurationMinutes); i++) {
        const currDate = startDate + minutesToMilliseconds(singleAppointmentDurationMinutes * i);
        const endOfCurrDate = currDate + minutesToMilliseconds(singleAppointmentDurationMinutes);
        // TODO:
        if (bookedMeetingsDates.some(d => {
            const startDate = d.start;
            const endDate = d.end;
            return startDate === currDate || (startDate < currDate && currDate < endDate) || (endOfCurrDate > startDate && endOfCurrDate < endDate);
        })) continue;

        availableTimes.add(currDate);
    }

    return Array.from(availableTimes);
}