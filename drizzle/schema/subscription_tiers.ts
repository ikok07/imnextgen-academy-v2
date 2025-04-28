import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const subscriptionTierTypeEnum = pgEnum("subscription_tier_enum", ["monthly", "3-month", "6-month", "lifetime"]);

export const subscriptionTiersTable = pgTable("subscription_tiers", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    type: subscriptionTierTypeEnum().notNull(),
    title: text("title").notNull(),
    description: text("description")
});

export const subscriptionTierSchema = createSelectSchema(subscriptionTiersTable);
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;

export const subscriptionTierInsertSchema = createInsertSchema(subscriptionTiersTable);
export type SubscriptionTierInsert = z.infer<typeof subscriptionTierInsertSchema>;