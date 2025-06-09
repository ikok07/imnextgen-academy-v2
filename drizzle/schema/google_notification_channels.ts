import {pgTable, text} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const googleNotificationChannelsTable = pgTable("google_notification_channels", {
    id: text("id").notNull().primaryKey(),
    token: text("token").notNull(),
    resource_id: text("resource_id").notNull().unique(),
    expiration: text("expiration"),
});

export const googleNotificationChannelSchema = createSelectSchema(googleNotificationChannelsTable);
export type GoogleNotificationChannel = z.infer<typeof googleNotificationChannelSchema>;

export const googleNotificationChannelInsertSchema = createInsertSchema(googleNotificationChannelsTable);
export type GoogleNotificationChannelInsert = z.infer<typeof googleNotificationChannelInsertSchema>;