import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IValidateWebhookUseCase = ReturnType<typeof validateWebhookUseCase>;

export const validateWebhookUseCase = (
    paymentService: IPaymentService
) => async (rawBody: string, signature: string, secret: string) => {
    return paymentService.validateWebhook(rawBody, signature, secret);
}