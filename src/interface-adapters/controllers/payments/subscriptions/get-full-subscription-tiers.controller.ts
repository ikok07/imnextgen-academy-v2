import {
    IGetFullSubscriptionTiersUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-subscription-tiers.use-case";

export type IGetFullSubscriptionTiersController = ReturnType<typeof getFullSubscriptionTiersController>;

export const getFullSubscriptionTiersController = (
    getFullSubscriptionTiersUseCase: IGetFullSubscriptionTiersUseCase
) => () => {
    return getFullSubscriptionTiersUseCase();
}