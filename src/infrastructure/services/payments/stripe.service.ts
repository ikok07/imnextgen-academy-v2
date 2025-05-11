import {
    ConfirmCheckout,
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
            throw new PaymentError(`Failed to get products from payment service! ${e}`);
        }
    }

    async getSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>> {
        try {
            return this.stripeClient.subscriptions.retrieve(subscriptionId);
        } catch(e) {
            throw new PaymentError(`Failed to get subscription from payment service! ${e}`);
        }
    }

    async getCustomer(customerId: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> {
        try {
            return this.stripeClient.customers.retrieve(customerId);
        } catch(e) {
            throw new PaymentError(`Failed to get customer from payment service! ${e}`);
        }
    }

    async createCheckoutSession({productIds, customerId, customerEmail, locale, returnUrl, mode, subscriptionMetadata, metadata, clientSecretOnly}: CreateCheckoutSessionOptions): Promise<Stripe.Response<Stripe.Checkout.Session> | string> {
        const products = (await Promise.all(productIds.map(id => this.stripeClient.products.retrieve(id)))).filter(p => !!p.default_price);

        try {
            const session = await this.stripeClient.checkout.sessions.create({
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
                ui_mode: "custom",
                return_url: returnUrl,
                subscription_data: {
                    metadata: subscriptionMetadata
                },
                allow_promotion_codes: true,
                phone_number_collection: {
                    enabled: true
                },
                metadata: metadata
            });
            return clientSecretOnly && session.client_secret ? session.client_secret : session;
        } catch(e) {
            throw new PaymentError(`Failed to create checkout session! ${e}`);
        }
    }

    async getCheckoutSessionsLineItems(sessionId: string): Promise<Stripe.LineItem[]> {
        try {
            return (await this.stripeClient.checkout.sessions.listLineItems(sessionId)).data;
        } catch(e) {
            throw new PaymentError(`Failed to get checkout session's line items! ${e}`);
        }
    }

    validateWebhook(rawBody: string, signature: string, secret: string): Stripe.Event {
        try {
            return this.stripeClient.webhooks.constructEvent(rawBody, signature, secret);
        } catch(e) {
            throw new PaymentError("Failed to validate webhook!");
        }
    }
}