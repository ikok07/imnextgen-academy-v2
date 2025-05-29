import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {MeetingRepeatDay} from "@/drizzle/schema/meeting_repeat_days";
import {MeetingExcludedDate} from "@/drizzle/schema/meeting_excluded_dates";
import {MeetingDate} from "@/drizzle/schema/meeting_dates";
import {MeetingSignedUpUser} from "@/drizzle/schema/meeting_signed_up_users";

export const meetingAccessEnum = pgEnum("meeting_access_enum", ["free", "premium"]);
export const meetingPlatformEnum = pgEnum("meeting_platform_enum", ["zoom"])

export const meetingPlatformEnumSchema = createSelectSchema(meetingPlatformEnum);
export type MeetingPlatform = z.infer<typeof meetingPlatformEnumSchema>;

export const meetingsTable = pgTable("meetings", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    access: meetingAccessEnum().notNull().default("free"),
    title: text("title").notNull(),
    description: text("description").notNull(),
    image_url: text("image_url").notNull(),
    platform: meetingPlatformEnum().notNull().default("zoom"),
    url: text("url").notNull()
});

export const meetingSchema = createSelectSchema(meetingsTable);
export type Meeting = z.infer<typeof meetingSchema>;

export const meetingInsertSchema = createInsertSchema(meetingsTable);
export type MeetingInsert = z.infer<typeof meetingInsertSchema>;

export type FullMeeting =
    Meeting &
    {repeat_days: Omit<MeetingRepeatDay, "meeting_id">[]} &
    {excluded_dates: Omit<MeetingExcludedDate, "meeting_id">[]} &
    {meeting_dates: Omit<MeetingDate, "meeting_id">[]}