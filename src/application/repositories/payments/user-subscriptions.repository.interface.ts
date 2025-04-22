import {SubscriptionTier, UserSubscription} from "@/drizzle/schema/user_subscriptions";

export interface IUserSubscriptionsRepository {
    getUserSubscription(userId: string): Promise<UserSubscription | undefined>
    addUserSubscription(userId: string, tier: SubscriptionTier): Promise<UserSubscription>
    updateUserSubscriptionTier(userId: string, tier: SubscriptionTier): Promise<UserSubscription>
}