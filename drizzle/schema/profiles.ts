import { pgTable, uuid, text, boolean, pgEnum } from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const profileAccessEnum = pgEnum("profile_access", [
    "free",
    "subscription",
    "paid"
])

export const profilesTable = pgTable("profiles", {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    configured: boolean("configured").notNull().default(false),
    image_url: text("image_url"),
    access: profileAccessEnum().notNull().default("free")
})

export const profilesSchema = createSelectSchema(profilesTable);
export type Profile = z.infer<typeof profilesSchema>;

export const profilesInsertSchema = createInsertSchema(profilesTable);
export type ProfileInsert = z.infer<typeof profilesInsertSchema>;