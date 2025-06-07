import {
    GetCalendarEventsOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";

export type IGetCalendarEventsUseCase = ReturnType<typeof getCalendarEventsUseCase>;

export const getCalendarEventsUseCase = (
    calendarService: ICalendarService
) => async (opts: GetCalendarEventsOptions) => {
    return calendarService.getCalendarEvents(opts);
}