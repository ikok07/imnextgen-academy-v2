import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const mentorSchedulesTable = pgTable("mentor_schedules", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull(),
    day_of_week: integer("day_of_week").notNull(),
    start_hour: integer("start_hour").notNull(),
    start_minutes: integer("start_minutes").notNull(),
    duration_minutes: integer("duration").notNull()
});

export const mentorScheduleSchema = createSelectSchema(mentorSchedulesTable);
export type MentorSchedule = z.infer<typeof mentorScheduleSchema>;

export const mentorScheduleInsertSchema = createInsertSchema(mentorSchedulesTable);
export type MentorScheduleInsert = z.infer<typeof mentorScheduleInsertSchema>;