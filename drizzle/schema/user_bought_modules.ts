import {pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";
import {modulesTable} from "@/drizzle/schema/modules";

export const userBoughtModuleTable = pgTable("user_bought_modules", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    module_id: text("module_id").notNull().references(() => modulesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
});

export const userBoughtModuleSchema = createSelectSchema(userBoughtModuleTable);
export type UserBoughtModule = z.infer<typeof userBoughtModuleSchema>;

export const userBoughtModuleInsertSchema = createInsertSchema(userBoughtModuleTable);
export type UserBoughtModuleInsert = z.infer<typeof userBoughtModuleInsertSchema>;