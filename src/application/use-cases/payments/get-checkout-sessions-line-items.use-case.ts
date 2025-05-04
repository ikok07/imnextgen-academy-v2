import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IGetCheckoutSessionsLineItemsUseCase = ReturnType<typeof getCheckoutSessionsLineItemsUseCase>;

export const getCheckoutSessionsLineItemsUseCase = (
    paymentService: IPaymentService
) => (sessionId: string) => {
    return paymentService.getCheckoutSessionsLineItems(sessionId);
}