import {
    DeleteCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";
import {
    IDeleteNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/delete-notification-channel.use-case";

export type IDeleteCalendarEventUseCase = ReturnType<typeof deleteCalendarEventUseCase>;

export const deleteCalendarEventUseCase = (
    calendarService: ICalendarService,
    deleteNotificationChannelUseCase: IDeleteNotificationChannelUseCase
) => async (opts: DeleteCalendarEventOptions) => {
    await calendarService.deleteCalendarEvent(opts);
    await deleteNotificationChannelUseCase(opts.eventId);
}