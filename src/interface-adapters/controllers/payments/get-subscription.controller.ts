import {IGetSubscriptionUseCase} from "@/src/application/use-cases/payments/get-subscription.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSubscriptionController = ReturnType<typeof getSubscriptionController>;

export const getSubscriptionController = (
    getSubscriptionUseCase: IGetSubscriptionUseCase
) => async (subscriptionId: string | undefined) => {

    if (!subscriptionId) throw new InputParseError("Invalid subscriptionId!");

    return getSubscriptionUseCase(subscriptionId);
}