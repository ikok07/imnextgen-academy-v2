import {pgTable, text} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const googleNotificationChannelsTable = pgTable("google_notification_channels", {
    id: text("id").notNull().primaryKey(),
    token: text("token").notNull(),
    channel_internal_resource_id: text("channel_internal_resource_id").notNull(), // provided by google after channel creation
    resource_id: text("resource_id").notNull().unique(), // example: calendar event id
    expiration: text("expiration"),
});

export const googleNotificationChannelSchema = createSelectSchema(googleNotificationChannelsTable);
export type GoogleNotificationChannel = z.infer<typeof googleNotificationChannelSchema>;

export const googleNotificationChannelInsertSchema = createInsertSchema(googleNotificationChannelsTable);
export type GoogleNotificationChannelInsert = z.infer<typeof googleNotificationChannelInsertSchema>;