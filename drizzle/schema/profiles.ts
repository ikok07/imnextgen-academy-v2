import { pgTable, uuid, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const profilesTable = pgTable("profiles", {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    configured: boolean("configured").notNull().default(false),
    payment_customer_id: text("payment_customer_id"),
    image_url: text("image_url"),
})

export const profilesSchema = createSelectSchema(profilesTable);
export type Profile = z.infer<typeof profilesSchema>;

export const profilesInsertSchema = createInsertSchema(profilesTable);
export type ProfileInsert = z.infer<typeof profilesInsertSchema>;