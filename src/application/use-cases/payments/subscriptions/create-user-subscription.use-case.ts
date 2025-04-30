import {
    ISubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {UserSubscriptionInsert} from "@/drizzle/schema/user_subscriptions";

export type ICreateUserSubscriptionUseCase = ReturnType<typeof createUserSubscriptionUseCase>;

export const createUserSubscriptionUseCase = (
    subscriptionsRepository: ISubscriptionsRepository
) => async (subscription: UserSubscriptionInsert) => {
    return subscriptionsRepository.createUserSubscription(subscription);
}