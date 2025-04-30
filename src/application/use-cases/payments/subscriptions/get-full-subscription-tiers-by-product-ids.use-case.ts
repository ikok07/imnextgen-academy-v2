import {
    ISubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";

export type IGetFullSubscriptionTiersByProductIdsUseCase = ReturnType<typeof getFullSubscriptionTiersByProductIdsUseCase>;

export const getFullSubscriptionTiersByProductIdsUseCase = (
    subscriptionsRepository: ISubscriptionsRepository
) => async (productIds: string[]) => {
    const results = await subscriptionsRepository.getSubscriptionTiersByProductIds(productIds);

    const tiersMap = new Map<string, FullSubscriptionTier>();

    for (const result of results) {
        if (!tiersMap.has(result.tier.id)) {
            tiersMap.set(result.tier.id, {
                ...result.tier,
                perks: []
            })
        }

        const tier = tiersMap.get(result.tier.id)!;

        if (result.perk) tier.perks.push(result.perk);
    }
    return Array.from(tiersMap.values());
}