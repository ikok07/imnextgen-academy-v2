import {pgTable, text, integer, check} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {modulesTable} from "@/drizzle/schema/modules";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const sectionsTable = pgTable("sections", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    module_id: text("module_id").notNull().references(() => modulesTable.id, {
        onUpdate: "cascade",
        onDelete: "set null"
    }),
    title: text("title").notNull(),
    order_number: integer("order_number").notNull()
}, (table) => [
    check("order_number_check", sql`${table.order_number} > -1`)
])

export const sectionsSchema = createSelectSchema(sectionsTable);
export type Section = z.infer<typeof sectionsSchema>;

export const sectionsInsertSchema = createInsertSchema(sectionsTable);
export type SectionInsert = z.infer<typeof sectionsInsertSchema>;
