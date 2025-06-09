import {
    GoogleNotificationChannel,
    GoogleNotificationChannelInsert
} from "@/drizzle/schema/google_notification_channels";

export interface IGoogleNotificationChannelsRepository {
    getNotificationChannelById(resourceId: string): Promise<GoogleNotificationChannel>
    createNotificationChannel(data: GoogleNotificationChannelInsert): Promise<GoogleNotificationChannel>
    deleteNotificationChannel(resourceId: string): Promise<void>
}