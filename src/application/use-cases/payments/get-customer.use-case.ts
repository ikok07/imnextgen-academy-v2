import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";

export type IGetCustomerUseCase = ReturnType<typeof getCustomerUseCase>;

export const getCustomerUseCase = (
    paymentService: IPaymentService
) => async (customerId: string) => {
    return paymentService.getCustomer(customerId);
}