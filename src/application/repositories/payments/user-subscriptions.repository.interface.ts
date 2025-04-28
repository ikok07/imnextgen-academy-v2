import {UserSubscription} from "@/drizzle/schema/user_subscriptions";
import {SubscriptionTier} from "@/drizzle/schema/subscription_tiers";
import {SubscriptionPerk} from "@/drizzle/schema/subscription_perks";
import {z} from "zod";

export const rawUserSubscriptionResultsSchema = z.array(z.object({
    subscription: z.custom<UserSubscription>(),
    tier: z.custom<SubscriptionTier>(),
    perk: z.custom<SubscriptionPerk>()
}));

export type RawUserSubscriptionResults = z.infer<typeof rawUserSubscriptionResultsSchema>;

export interface IUserSubscriptionsRepository {
    getUserSubscription(userId: string): Promise<RawUserSubscriptionResults | undefined>
}