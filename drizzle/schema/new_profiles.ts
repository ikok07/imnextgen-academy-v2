import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import {profilesTable} from "@/drizzle/schema/profiles";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import { sql } from "drizzle-orm";

export const newProfilesTable = pgTable("new_profiles", {
    id: uuid("id").notNull().default(sql`gen_random_uuid()`).primaryKey(),
    profile_id: text("profile_id").references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
})

export const newProfilesSchema = createSelectSchema(newProfilesTable);
export type NewProfile = z.infer<typeof newProfilesSchema>;

export const newProfilesInsertSchema = createInsertSchema(newProfilesTable);
export type NewProfileInsert = z.infer<typeof newProfilesInsertSchema>;