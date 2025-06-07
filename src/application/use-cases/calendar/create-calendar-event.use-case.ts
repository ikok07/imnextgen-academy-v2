import {
    CreateCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";

export type ICreateCalendarEventUseCase = ReturnType<typeof createCalendarEventUseCase>;

export const createCalendarEventUseCase = (
    calendarService: ICalendarService
) => async (opts: CreateCalendarEventOptions) => {
    return calendarService.createCalendarEvent(opts);
}