import {pgTable, text, integer, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";
import {meetingsTable} from "@/drizzle/schema/meetings";

export const meetingSignedUpUsersTable = pgTable("meeting_signed_up_users", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").references(() => profilesTable.id),
    name: text("name").notNull(),
    email: text("email").notNull(), // allow anonymous up users to sign up for meetings
    phone: text("phone").notNull(),
    meeting_id: text("meeting_id").notNull().references(() => meetingsTable.id),
    meeting_start_date: integer("meeting_start_date").notNull(),
}, (table) => {
    return {
        unique_user_records: unique().on(table.email, table.meeting_id)
    }
});

export const meetingSignedUpUserSchema = createSelectSchema(meetingSignedUpUsersTable);
export type MeetingSignedUpUser = z.infer<typeof meetingSignedUpUserSchema>;

export const meetingSignedUpUserInsertSchema = createInsertSchema(meetingSignedUpUsersTable);
export type MeetingSignedUpUserInsert = z.infer<typeof meetingSignedUpUserInsertSchema>;