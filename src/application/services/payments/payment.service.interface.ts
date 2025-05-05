import {PaymentProduct} from "@/src/entities/models/payments/payment-product";
import {z} from "zod";
import Stripe from "stripe";
import {StripeCheckout, StripeCheckoutSession} from "@stripe/stripe-js";

export const createCheckoutSessionOptionsSchema = z.object({
    productIds: z.array(z.string()),
    customerId: z.string().optional(),
    customerEmail: z.string().email().optional(),
    locale: z.enum(["bg"]),
    mode: z.enum(["subscription", "payment"]),
    returnUrl: z.string(),
    subscriptionMetadata: z.record(z.string()).optional(),
    metadata: z.record(z.string()).optional()
});

export type CreateCheckoutSessionOptions = z.infer<typeof createCheckoutSessionOptionsSchema>;
export type ConfirmCheckout = StripeCheckoutSession & Omit<Omit<StripeCheckout, "session">, "on">;

export interface IPaymentService {
    getProduct(productId: string): Promise<PaymentProduct>
    getSubscription(subscriptionId: string): Promise<Stripe.Response<Stripe.Subscription>>
    getCustomer(customerId: string): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>
    createCheckoutSession(opts: CreateCheckoutSessionOptions): Promise<Stripe.Response<Stripe.Checkout.Session>>
    getCheckoutSessionsLineItems(sessionId: string): Promise<Stripe.LineItem[]>
    confirmCheckout(customerEmail: string, checkout: ConfirmCheckout): Promise<void>
    validateWebhook(rawBody: string, signature: string, secret: string): Stripe.Event
}