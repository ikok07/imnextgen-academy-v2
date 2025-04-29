"use client"

import {loadStripe} from "@stripe/stripe-js";
import Stripe from "stripe";
import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {locale: "bg"});

type StripePaymentSheetProps = {
    clientSecret: string | null
}

export default function StripePaymentSheet({clientSecret}: StripePaymentSheetProps) {
    return <EmbeddedCheckoutProvider stripe={stripePromise} options={{clientSecret}}>
        <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
}