import {
    IGetFullSubscriptionTiersByProductIdsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-full-subscription-tiers-by-product-ids.use-case";

export type IGetFullSubscriptionTiersByProductIdsController = ReturnType<typeof getFullSubscriptionTiersByProductIdsController>;

export const getFullSubscriptionTiersByProductIdsController = (
    getFullSubscriptionTiersByProductIdsUseCase: IGetFullSubscriptionTiersByProductIdsUseCase
) => async (productIds: string[]) => {
    return getFullSubscriptionTiersByProductIdsUseCase(productIds);
}