import {hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds} from "date-fns";

type Options = {
    dateMs: number,
    startHour: number,
    startMinutes: number,
    totalDurationMinutes: number,
    singleAppointmentDurationMinutes: number,
    bookedMeetingsDates: { date: number, durationMinutes: number }[]
}

export function getCalendarAvailableTimes({dateMs, startHour, startMinutes, totalDurationMinutes, singleAppointmentDurationMinutes, bookedMeetingsDates}: Options) {
    const startDate = dateMs + hoursToMilliseconds(startHour) + minutesToMilliseconds(startMinutes);

    const availableTimes: Set<number> = new Set();

    for (let i = 0; i < Math.round(totalDurationMinutes / singleAppointmentDurationMinutes); i++) {
        const currDate = startDate + minutesToMilliseconds(singleAppointmentDurationMinutes * i);

        if (bookedMeetingsDates.some(d => {
            const startDate = d.date;
            const endDate = d.date + minutesToMilliseconds(d.durationMinutes);
            return startDate === currDate || (startDate < currDate && currDate < endDate);
        })) continue;

        availableTimes.add(currDate);
    }

    return Array.from(availableTimes);
}