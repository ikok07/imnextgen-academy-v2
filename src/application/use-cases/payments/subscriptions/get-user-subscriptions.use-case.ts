import {
    IUserSubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";

export type IGetUserSubscriptionsUseCase = ReturnType<typeof getUserSubscriptionsUseCase>;

export const getUserSubscriptionsUseCase = (
    userSubscriptionsRepository: IUserSubscriptionsRepository
) => async (userId: string) => {
    return userSubscriptionsRepository.getUserSubscription(userId);
}