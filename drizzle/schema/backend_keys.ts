import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const backendKeysTable = pgTable("backend_keys", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    encoded_key: text("encoded_key").notNull().unique(),
    expiry_date: integer("expiry_date").notNull()
});

export const backendKeySchema = createSelectSchema(backendKeysTable);
export type BackendKey = z.infer<typeof backendKeySchema>;

export const backendKeyInsertSchema = createInsertSchema(backendKeysTable);
export type BackendKeyInsert = z.infer<typeof backendKeyInsertSchema>;