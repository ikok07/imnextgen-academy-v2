import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";

export const userSpecificMeetingsTable = pgTable("user_specific_meetings", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    date: integer("date").notNull(),
    duration_minutes: integer("duration_minutes").notNull()
});

export const userSpecificMeetingSchema = createSelectSchema(userSpecificMeetingsTable);
export type UserSpecificMeeting = z.infer<typeof userSpecificMeetingSchema>;

export const userSpecificMeetingInsertSchema = createInsertSchema(userSpecificMeetingsTable);
export type UserSpecificMeetingInsert = z.infer<typeof userSpecificMeetingInsertSchema>;