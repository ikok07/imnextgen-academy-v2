import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IGetProductUseCase = ReturnType<typeof getProductUseCase>;

export const getProductUseCase = (
    paymentService: IPaymentService
) => (productId: string) => {
    return paymentService.getProduct(productId);
}