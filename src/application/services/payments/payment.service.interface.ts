import {PaymentProduct} from "@/src/entities/models/payments/payment-product";

export interface IPaymentService {
    getProduct(productId: string): Promise<PaymentProduct>
}