"use client"

import {loadStripe} from "@stripe/stripe-js";
import {CheckoutProvider, PaymentElement, PaymentMethodMessagingElement, useCheckout} from "@stripe/react-stripe-js";
import {useTheme} from "next-themes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {locale: "bg"});

type StripePaymentSheetProps = {
    clientSecret: string | null,
    userEmail: string
}


export default function StripePaymentSheet(props: StripePaymentSheetProps) {
    const {resolvedTheme} = useTheme();
    const promise = () => new Promise<string>(res => res(props.clientSecret!));

    return <CheckoutProvider
        stripe={stripePromise}
        options={{
            fetchClientSecret: promise,
            elementsOptions: {
                loader: "always",
                appearance: {
                    theme: resolvedTheme === "dark" ? "night" : "stripe",
                    variables: {
                        colorPrimary: "hsl(253 100% 68.4%)",
                        colorBackground: resolvedTheme === "dark" ? "hsl(0 0% 3.9%)" : "white"
                    }
                }
            }
        }} >
        <InnerContent {...props} />
    </CheckoutProvider>
}

function InnerContent({userEmail}: StripePaymentSheetProps) {
    const checkout = useCheckout();


    // TODO: Add in payment service!
    // function handlePay() {
    //
    //     await checkout.updateEmail(userEmail);
    //
    //     await checkout.confirm();
    // }

    return <>
        <PaymentElement />
        <PrimaryButton className="w-full py-2 mt-3">Плащане</PrimaryButton>
    </>
}