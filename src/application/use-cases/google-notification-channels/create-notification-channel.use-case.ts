import {
    IGoogleNotificationChannelsRepository
} from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";
import {GoogleNotificationChannelInsert} from "@/drizzle/schema/google_notification_channels";

export type ICreateNotificationChannelUseCase = ReturnType<typeof createNotificationChannelUseCase>;

export const createNotificationChannelUseCase = (
    googleNotificationChannelsRepository: IGoogleNotificationChannelsRepository
) => async (data: GoogleNotificationChannelInsert) => {
    return googleNotificationChannelsRepository.createNotificationChannel(data);
}