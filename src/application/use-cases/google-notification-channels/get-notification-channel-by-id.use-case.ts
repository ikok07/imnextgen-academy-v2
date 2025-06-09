import {
    IGoogleNotificationChannelsRepository
} from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";

export type IGetNotificationChannelByIdUseCase = ReturnType<typeof getNotificationChannelByIdUseCase>;

export const getNotificationChannelByIdUseCase = (
    googleNotificationChannelsRepository: IGoogleNotificationChannelsRepository
) => async (id: string) => {
    return googleNotificationChannelsRepository.getNotificationChannelById(id);
}