import {ConfirmCheckout, IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IConfirmCheckoutUseCase = ReturnType<typeof confirmCheckoutUseCase>;

export const confirmCheckoutUseCase = (
    paymentService: IPaymentService
) => async (customerEmail: string, checkout: ConfirmCheckout) => {
    return paymentService.confirmCheckout(customerEmail, checkout);
}