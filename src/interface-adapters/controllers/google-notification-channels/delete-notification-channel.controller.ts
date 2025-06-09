import {
    IDeleteNotificationChannelUseCase
} from "@/src/application/use-cases/google-notification-channels/delete-notification-channel.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IDeleteNotificationChannelController = ReturnType<typeof deleteNotificationChannelController>;

export const deleteNotificationChannelController = (
    deleteNotificationChannelUseCase: IDeleteNotificationChannelUseCase
) => async (resourceId: string | undefined) => {

    if (!resourceId) throw new InputParseError("Invalid resourceId!");

    return deleteNotificationChannelUseCase(resourceId);
}