import {IPaymentService} from "@/src/application/services/payments/payment.service.interface";
import {PaymentError} from "@/src/entities/errors/payments/payment";
import Stripe from "stripe";
import {PaymentProduct} from "@/src/entities/models/payments/payment-product";

export class StripeService implements IPaymentService {
    secretKey: string = process.env.STRIPE_SECRET_KEY!;

    stripeClient = new Stripe(this.secretKey);

    async getProduct(productId: string): Promise<PaymentProduct> {
        try {
            const productResponse = await this.stripeClient.products.retrieve(productId);

            const finalProduct: PaymentProduct = {
                id: productResponse.id,
                name: productResponse.name
            }

            if (typeof productResponse.default_price === "string") {
                const priceResponse = await this.stripeClient.prices.retrieve(productResponse.default_price)
                finalProduct.price = priceResponse.unit_amount;
                finalProduct.currency = priceResponse.currency;
            }

            return finalProduct;
        } catch(e) {
            throw new PaymentError("Failed to get products from payment service!");
        }
    }
}