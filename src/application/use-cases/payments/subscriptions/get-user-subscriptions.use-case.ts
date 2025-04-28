import {
    IUserSubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";

export type IGetUserSubscriptionsUseCase = ReturnType<typeof getUserSubscriptionsUseCase>;

export const getUserSubscriptionsUseCase = (
    userSubscriptionsRepository: IUserSubscriptionsRepository
) => async (userId: string) => {
    const rawSubscriptionResults =  await userSubscriptionsRepository.getUserSubscription(userId);
    if (!rawSubscriptionResults) return undefined;

    let fullSubscription: UserFullSubscription | undefined = undefined;

    for (const result of rawSubscriptionResults) {
        if (!fullSubscription) {
            fullSubscription = {
                ...result.subscription,
                tier: {
                    ...result.tier,
                    perks: [result.perk]
                }
            }
        }

        fullSubscription.tier.perks.push(result.perk);
    }

    return fullSubscription;
}