import {
    CreateCalendarEventOptions,
    ICalendarService
} from "@/src/application/services/calendar/calendar.service.interface";
import { ICreateNotificationChannelUseCase } from "../google-notification-channels/create-notification-channel.use-case";
import crypto from "node:crypto";

export type ICreateCalendarEventUseCase = ReturnType<typeof createCalendarEventUseCase>;

export const createCalendarEventUseCase = (
    calendarService: ICalendarService,
    createNotificationChannelUseCase: ICreateNotificationChannelUseCase
) => async (opts: CreateCalendarEventOptions) => {
    const res = await calendarService.createCalendarEvent(opts);

    if (res.channel) {
        await createNotificationChannelUseCase({
            id: res.channel.id,
            token: crypto.createHmac("sha256", process.env.KEYS_SECRET!).update(res.channel.token).digest("base64"),
            resource_id: res.id,
            channel_internal_resource_id: res.channel.internalResourceId
        });
    }

    return res;
}