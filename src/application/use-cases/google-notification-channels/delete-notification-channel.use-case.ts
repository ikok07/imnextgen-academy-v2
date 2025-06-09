import {
    IGoogleNotificationChannelsRepository
} from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";

export type IDeleteNotificationChannelUseCase = ReturnType<typeof deleteNotificationChannelUseCase>;

export const deleteNotificationChannelUseCase = (
    googleNotificationChannelsRepository: IGoogleNotificationChannelsRepository
) => async (resourceId: string) => {
    return googleNotificationChannelsRepository.deleteNotificationChannel(resourceId);
}