import {SubscriptionTier} from "@/drizzle/schema/subscription_tiers";
import {SubscriptionPerk} from "@/drizzle/schema/subscription_perks";
import {UserSubscription} from "@/drizzle/schema/user_subscriptions";

export type UserFullSubscription =
    Omit<UserSubscription, "tier_id">
    & {
    tier: SubscriptionTier & {
        perks: Omit<SubscriptionPerk, "tier_id">[]
    }
}