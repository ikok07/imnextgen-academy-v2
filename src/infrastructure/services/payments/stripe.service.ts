import {
    CreateCheckoutSessionOptions,
    IPaymentService
} from "@/src/application/services/payments/payment.service.interface";
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

    async createCheckoutSession({productIds, customerId, customerEmail, locale, returnUrl, mode, metadata}: CreateCheckoutSessionOptions): Promise<Stripe.Response<Stripe.Checkout.Session>> {
        const products = (await Promise.all(productIds.map(id => this.stripeClient.products.retrieve(id)))).filter(p => !!p.default_price);

        try {
            return this.stripeClient.checkout.sessions.create({
                line_items: products.map(p => ({
                    price: p.default_price as string,
                    adjustable_quantity: {
                        enabled: false
                    },
                    quantity: 1
                })),
                customer_email: customerEmail,
                customer: customerId,
                locale,
                mode,
                ui_mode: "embedded",
                return_url: returnUrl,
                metadata: metadata
            })
        } catch(e) {
            throw new PaymentError("Failed to create checkout session!");
        }
    }
}