import {
    IRemoveUserSubscriptionUseCase
} from "@/src/application/use-cases/payments/subscriptions/remove-user-subscription.use-case";

export type IRemoveUserSubscriptionController = ReturnType<typeof removeUserSubscriptionController>;

export const removeUserSubscriptionController = (
    removeUserSubscriptionUseCase: IRemoveUserSubscriptionUseCase
) => async (userId: string) => {
    return removeUserSubscriptionUseCase(userId);
}