import {pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";
import {subscriptionTiersTable} from "@/drizzle/schema/subscription_tiers";

export const userSubscriptionTable = pgTable("user_subscriptions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }).unique(),
    tier_id: text("tier_id").notNull().references(() => subscriptionTiersTable.id)
});

export const userSubscriptionSchema = createSelectSchema(userSubscriptionTable);
export type UserSubscription = z.infer<typeof userSubscriptionSchema>;

export const userSubscriptionInsertSchema = createInsertSchema(userSubscriptionTable);
export type UserSubscriptionInsert = z.infer<typeof userSubscriptionInsertSchema>;