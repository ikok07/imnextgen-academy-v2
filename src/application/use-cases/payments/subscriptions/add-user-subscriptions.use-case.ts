import {
    IUserSubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";

export type IAddUserSubscriptionsUseCase = ReturnType<typeof addUserSubscriptionsUseCase>;

export const addUserSubscriptionsUseCase = (
    userSubscriptionsRepository: IUserSubscriptionsRepository
) => async (userId: string, tier: SubscriptionTier) => {
    return userSubscriptionsRepository.addUserSubscription(userId, tier);
}