import {pgTable, text, integer} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import { meetingsTable } from "./meetings";

export const meetingRepeatDayTable = pgTable("meeting_repeat_days", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    meeting_id: text("meeting_id").notNull().references(() => meetingsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    day_of_week: integer("day_of_week").notNull(),
    start_hour_utc: integer("start_hour_utc").notNull(),
    duration_minutes: integer("duration_minutes").notNull(),
    valid_until: integer("valid_until")
});

export const meetingRepeatDaySchema = createSelectSchema(meetingRepeatDayTable);
export type MeetingRepeatDay = z.infer<typeof meetingRepeatDaySchema>;

export const meetingRepeatDayInsertSchema = createInsertSchema(meetingRepeatDayTable);
export type MeetingRepeatDayInsert = z.infer<typeof meetingRepeatDayInsertSchema>;