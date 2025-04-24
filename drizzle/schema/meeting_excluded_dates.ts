import {pgTable, text, integer} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {meetingsTable} from "@/drizzle/schema/meetings";

export const meetingExcludedDateTable = pgTable("meeting_excluded_dates", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    meeting_id: text("meeting_id").notNull().references(() => meetingsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    start_date: integer("start_date").notNull(),
    end_date: integer("end_date").notNull(),
});

export const meetingExcludedDateSchema = createSelectSchema(meetingExcludedDateTable);
export type MeetingExcludedDate = z.infer<typeof meetingExcludedDateSchema>;

export const meetingExcludedDateInsertSchema = createInsertSchema(meetingExcludedDateTable);
export type MeetingExcludedDateInsert = z.infer<typeof meetingExcludedDateInsertSchema>;