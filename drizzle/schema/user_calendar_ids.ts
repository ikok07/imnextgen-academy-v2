import {pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";

export const userCalendarIdsTable = pgTable("user_calendar_ids", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    calendar_id: text("calendar_id").notNull()
});

export const userCalendarIdSchema = createSelectSchema(userCalendarIdsTable);
export type UserCalendarId = z.infer<typeof userCalendarIdSchema>;

export const userCalendarIdInsertSchema = createInsertSchema(userCalendarIdsTable);
export type UserCalendarIdInsert = z.infer<typeof userCalendarIdInsertSchema>;