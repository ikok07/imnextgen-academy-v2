import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const automationType = pgEnum("automation_type_enum", ["sales-meeting-booked"]);

export const automationsTable = pgTable("automations", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    url: text("url").notNull(),
    type: automationType().notNull().unique()
});

export const automationTypeSchema = createSelectSchema(automationType);
export type AutomationType = z.infer<typeof automationTypeSchema>;

export const automationSchema = createSelectSchema(automationsTable);
export type Automation = z.infer<typeof automationSchema>;

export const automationInsertSchema = createInsertSchema(automationsTable);
export type AutomationInsert = z.infer<typeof automationInsertSchema>;