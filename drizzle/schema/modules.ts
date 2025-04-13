import {pgTable, text, integer} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {profileAccessEnum} from "@/drizzle/schema/profiles";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const modulesTable = pgTable("modules", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    description: text("description").notNull(),
    access: profileAccessEnum().notNull().default("free"),
    order_number: integer("order_number").notNull()
})

export const modulesTableSchema = createSelectSchema(modulesTable);
export type Module = z.infer<typeof modulesTableSchema>;

export const modulesTableInsertSchema = createInsertSchema(modulesTable);
export type ModuleInsert = z.infer<typeof modulesTableInsertSchema>;