import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {meetingsTable} from "@/drizzle/schema/meetings";

export const meetingDateTable = pgTable("meeting_dates", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    meeting_id: text("meeting_id").notNull().references(() => meetingsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    start_date: integer("start_date").notNull(),
    end_date: integer("end_date").notNull(),
});

export const meetingDateSchema = createSelectSchema(meetingDateTable);
export type MeetingDate = z.infer<typeof meetingDateSchema>;

export const meetingDateInsertSchema = createInsertSchema(meetingDateTable);
export type MeetingDateInsert = z.infer<typeof meetingDateInsertSchema>;