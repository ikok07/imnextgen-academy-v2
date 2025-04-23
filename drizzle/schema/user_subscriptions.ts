import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";

export const subscriptionTierEnum = pgEnum("subscription_tier_enum", ["inactive", "monthly", "3-month", "6-month", "lifetime"]);

export const userSubscriptionTable = pgTable("user_subscriptions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    subscription_tier: subscriptionTierEnum().notNull()
});

export const subscriptionTierSchema = createSelectSchema(subscriptionTierEnum);
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;

export const userSubscriptionSchema = createSelectSchema(userSubscriptionTable);
export type UserSubscription = z.infer<typeof userSubscriptionSchema>;

export const userSubscriptionInsertSchema = createInsertSchema(userSubscriptionTable);
export type UserSubscriptionInsert = z.infer<typeof userSubscriptionInsertSchema>;