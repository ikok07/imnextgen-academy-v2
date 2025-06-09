import {
    GoogleNotificationChannel,
    GoogleNotificationChannelInsert
} from "@/drizzle/schema/google_notification_channels";
import {z} from "zod";

export const getNotificationChannelByRecordIdSchema = z.object({
    id: z.string(),
    resourceId: z.undefined(),
    internalResourceId: z.undefined()
});

export const getNotificationChannelByResourceIdSchema = z.object({
    id: z.undefined(),
    resourceId: z.string(),
    internalResourceId: z.undefined()
});

export const getNotificationChannelByInternalResourceIdSchema = z.object({
    id: z.undefined(),
    resourceId: z.undefined(),
    internalResourceId: z.string()
});

export const getNotificationChannelByIdOptionsSchema =
    getNotificationChannelByRecordIdSchema
    .or(getNotificationChannelByResourceIdSchema)
    .or(getNotificationChannelByInternalResourceIdSchema);

export type GetNotificationChannelByIdOptions = z.infer<typeof getNotificationChannelByIdOptionsSchema>;

export interface IGoogleNotificationChannelsRepository {
    getNotificationChannelById(opts: GetNotificationChannelByIdOptions): Promise<GoogleNotificationChannel>
    createNotificationChannel(data: GoogleNotificationChannelInsert): Promise<GoogleNotificationChannel>
    deleteNotificationChannel(resourceId: string): Promise<void>
}