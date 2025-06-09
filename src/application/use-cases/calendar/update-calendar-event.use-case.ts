import {
    ICalendarService,
    UpdateCalendarEventOptions
} from "@/src/application/services/calendar/calendar.service.interface";

export type IUpdateCalendarEventUseCase = ReturnType<typeof updateCalendarEventUseCase>;

export const updateCalendarEventUseCase = (
    calendarService: ICalendarService
) => async (opts: UpdateCalendarEventOptions) => {
    return calendarService.updateCalendarEvent(opts);
}