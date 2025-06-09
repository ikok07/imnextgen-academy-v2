import {
    IGetNotificationChannelByIdUseCase
} from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetNotificationChannelByIdController = ReturnType<typeof getNotificationChannelByIdController>;

export const getNotificationChannelByIdController = (
    getNotificationChannelByIdUseCase: IGetNotificationChannelByIdUseCase
) => async (resourceId: string | undefined) => {

    if (!resourceId) throw new InputParseError("Invalid resourceId!");

    return getNotificationChannelByIdUseCase(resourceId);
}