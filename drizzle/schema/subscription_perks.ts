import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {subscriptionTiersTable} from "@/drizzle/schema/subscription_tiers";

export const subscriptionPerksTable = pgTable("subscription_perks", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    tier_id: text("tier_id").notNull().references(() => subscriptionTiersTable.id, {
        onUpdate: "cascade",
        onDelete: "cascade"
    }),
    content: text("content"),
    order_number: integer("order_number").notNull().default(0)
});

export const subscriptionPerkSchema = createSelectSchema(subscriptionPerksTable);
export type SubscriptionPerk = z.infer<typeof subscriptionPerkSchema>;

export const subscriptionPerkInsertSchema = createInsertSchema(subscriptionPerksTable);
export type SubscriptionPerkInsert = z.infer<typeof subscriptionPerkInsertSchema>;