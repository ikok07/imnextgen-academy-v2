import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IGetSubscriptionUseCase = ReturnType<typeof getSubscriptionUseCase>;

export const getSubscriptionUseCase = (
    paymentService: IPaymentService
) => async (subscriptionId: string) => {
    return paymentService.getSubscription(subscriptionId);
}