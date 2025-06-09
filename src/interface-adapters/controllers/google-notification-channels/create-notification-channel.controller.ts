import {
    ICreateNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/create-notification-channel.use-case";
import {
    GoogleNotificationChannelInsert, googleNotificationChannelInsertSchema,
    googleNotificationChannelSchema
} from "@/drizzle/schema/google_notification_channels";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateNotificationChannelController = ReturnType<typeof createNotificationChannelController>;

export const createNotificationChannelController = (
    createNotificationChannelUseCase: ICreateNotificationChannelUseCase
) => async (data: Partial<GoogleNotificationChannelInsert>) => {

    const {data: parsedData, error} = googleNotificationChannelInsertSchema.safeParse(data);
    if (error) throw new InputParseError(`Invalid data! ${error}`);

    return createNotificationChannelUseCase(parsedData);
}