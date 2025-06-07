import {
    DeleteCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";

export type IDeleteCalendarEventUseCase = ReturnType<typeof deleteCalendarEventUseCase>;

export const deleteCalendarEventUseCase = (
    calendarService: ICalendarService
) => async (opts: DeleteCalendarEventOptions) => {
    return calendarService.deleteCalendarEvent(opts);
}