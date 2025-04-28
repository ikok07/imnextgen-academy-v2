import {SubscriptionTier} from "@/drizzle/schema/subscription_tiers";
import {SubscriptionPerk} from "@/drizzle/schema/subscription_perks";

export type FullSubscriptionTier = SubscriptionTier & {perks: Omit<SubscriptionPerk, "tier_id">[]};