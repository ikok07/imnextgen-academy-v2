import {
    IUserSubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";

export type IUpdateUserSubscriptionTierUseCase = ReturnType<typeof updateUserSubscriptionTierUseCase>;

export const updateUserSubscriptionTierUseCase = (
    userSubscriptionsRepository: IUserSubscriptionsRepository
) => async (userId: string, tier: SubscriptionTier) => {
    return userSubscriptionsRepository.updateUserSubscriptionTier(userId, tier);
}