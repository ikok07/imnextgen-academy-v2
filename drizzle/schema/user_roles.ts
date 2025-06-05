import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";

export const userRoles = pgEnum("user_roles_enum", ["user", "admin"]);

export const userRolesTable = pgTable("user_roles", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    type: userRoles().notNull(),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
});

export const userRoleTypeSchema = createSelectSchema(userRoles);
export type UserRoleType = z.infer<typeof userRoleTypeSchema>;

export const userRoleSchema = createSelectSchema(userRolesTable);
export type UserRole = z.infer<typeof userRoleSchema>;

export const userRoleInsertSchema = createInsertSchema(userRolesTable);
export type UserRoleInsert = z.infer<typeof userRoleInsertSchema>;