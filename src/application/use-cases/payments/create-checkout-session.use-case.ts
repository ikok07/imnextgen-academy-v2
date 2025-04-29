import {
    CreateCheckoutSessionOptions,
    IPaymentService
} from "@/src/application/services/payments/payment.service.interface";

export type ICreateCheckoutSessionUseCase = ReturnType<typeof createCheckoutSessionUseCase>;

export const createCheckoutSessionUseCase = (
    paymentService: IPaymentService
) => (opts: CreateCheckoutSessionOptions) => {
    return paymentService.createCheckoutSession(opts);
}