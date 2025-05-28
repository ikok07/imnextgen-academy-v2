import {pgTable, text, integer, check, pgEnum} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const moduleAccessEnum = pgEnum("module_access_enum", ["free", "subscription", "paid", "subscription-or-paid", "private", "pre-order"]);
export const moduleAccessEnumSchema = createSelectSchema(moduleAccessEnum);

export const modulesTable = pgTable("modules", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    description: text("description").notNull(),
    access: moduleAccessEnum().notNull().default("free"),
    order_number: integer("order_number").notNull(),
    stripe_product_id: text("stripe_product_id"),
    non_discounted_price_id: text("non_discounted_price_id"),
    image_url: text("image_url")
}, (table) => [
    check("order_number_check", sql`${table.order_number} > -1`)
])

export const modulesTableSchema = createSelectSchema(modulesTable);
export type Module = z.infer<typeof modulesTableSchema>;

export const modulesTableInsertSchema = createInsertSchema(modulesTable);
export type ModuleInsert = z.infer<typeof modulesTableInsertSchema>;