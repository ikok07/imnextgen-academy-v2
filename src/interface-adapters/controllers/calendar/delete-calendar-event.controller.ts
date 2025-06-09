import {IDeleteCalendarEventUseCase} from "@/src/application/use-cases/calendar/delete-calendar-event.use-case";
import {
    DeleteCalendarEventOptions,
    deleteCalendarEventOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";
import {
    IGetNotificationChannelByIdUseCase
} from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";

export type IDeleteCalendarEventController = ReturnType<typeof deleteCalendarEventController>;

export const deleteCalendarEventController = (
    deleteCalendarEventUseCase: IDeleteCalendarEventUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase,
    getNotificationChannelByIdUseCase: IGetNotificationChannelByIdUseCase
) => async (userId: string | undefined, opts: Partial<Omit<DeleteCalendarEventOptions, "calendarId">>) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    const {calendar_id} = await getCalendarIdByUserIdUseCase(userId);

    const {data: parsedOpts, error} = deleteCalendarEventOptionsSchema.safeParse({...opts, calendarId: calendar_id});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    const channel = await getNotificationChannelByIdUseCase({
        resourceId: parsedOpts.eventId
    });

    return deleteCalendarEventUseCase({
        ...parsedOpts,
        channel: {
            id: channel.id,
            internalResourceId: channel.channel_internal_resource_id
        }
    });
}