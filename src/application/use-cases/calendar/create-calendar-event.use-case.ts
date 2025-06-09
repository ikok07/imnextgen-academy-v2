import {
    CreateCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";
import { ICreateNotificationChannelUseCase } from "../google-notification-channels/create-notification-channel.use-case";

export type ICreateCalendarEventUseCase = ReturnType<typeof createCalendarEventUseCase>;

export const createCalendarEventUseCase = (
    calendarService: ICalendarService,
    createNotificationChannelUseCase: ICreateNotificationChannelUseCase
) => async (opts: CreateCalendarEventOptions) => {
    const res = await calendarService.createCalendarEvent(opts);

    if (res.channel) {
        await createNotificationChannelUseCase({
            id: res.channel.id,
            token: res.channel.token,
            resource_id: res.id
        })
    }

    return res;
}