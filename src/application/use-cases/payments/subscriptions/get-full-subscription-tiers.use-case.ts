import {
    ISubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";

export type IGetFullSubscriptionTiersUseCase = ReturnType<typeof getFullSubscriptionTiersUseCase>;

export const getFullSubscriptionTiersUseCase = (
    subscriptionsRepository: ISubscriptionsRepository
) => async () => {
    const rawResults = await subscriptionsRepository.getSubscriptionTiers();

    const tiersMap = new Map<string, FullSubscriptionTier>();

    for (const result of rawResults) {
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