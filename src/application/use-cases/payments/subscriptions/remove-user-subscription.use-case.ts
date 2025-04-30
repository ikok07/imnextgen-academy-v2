import {
    ISubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";

export type IRemoveUserSubscriptionUseCase = ReturnType<typeof removeUserSubscriptionUseCase>;

export const removeUserSubscriptionUseCase = (
    subscriptionsRepository: ISubscriptionsRepository
) => async (userId: string) => {
    return subscriptionsRepository.removeUserSubscription(userId);
}