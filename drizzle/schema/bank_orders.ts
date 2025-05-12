import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";

export const bankOrderEnum = pgEnum("bank_order_enum", ["failed", "pending", "success", "cron-failed"]);

export const bankOrdersTable = pgTable("bank_orders", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onUpdate: "cascade",
        onDelete: "set null"
    }),
    status: bankOrderEnum().notNull()
});

export const bankOrderSchema = createSelectSchema(bankOrdersTable);
export type BankOrder = z.infer<typeof bankOrderSchema>;

export const bankOrderInsertSchema = createInsertSchema(bankOrdersTable);
export type BankOrderInsert = z.infer<typeof bankOrderInsertSchema>;