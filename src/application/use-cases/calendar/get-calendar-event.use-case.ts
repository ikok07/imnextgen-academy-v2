import {
    GetCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";

export type IGetCalendarEventUseCase = ReturnType<typeof getCalendarEventUseCase>;

export const getCalendarEventUseCase = (
    calendarService: ICalendarService
) => async (opts: GetCalendarEventOptions) => {
    return calendarService.getCalendarEvent(opts);
}