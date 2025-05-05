"use client"

import {loadStripe} from "@stripe/stripe-js";
import {
    CheckoutProvider,
    PaymentElement,
    useCheckout,
} from "@stripe/react-stripe-js";
import {useTheme} from "next-themes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {useShop} from "@/app/_providers/ShopProvider";
import {useRouter} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {locale: "bg"});

type StripePaymentSheetProps = {
    clientSecret: string | null
}


export default function StripePaymentSheet(props: StripePaymentSheetProps) {
    const {resolvedTheme} = useTheme();
    const {selectedSubscriptionTier, selectedProductIds} = useShop();
    const router = useRouter();
    const promise = () => new Promise<string>(res => res(props.clientSecret!));

    useEffect(() => {
        if (!selectedSubscriptionTier && selectedProductIds.size === 0) {
            router.push(Routes.dashboard.shop.base());
        }
    }, []);

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
        <InnerContent />
    </CheckoutProvider>
}

function InnerContent() {
    const checkout = useCheckout();

    const {mutate: confirmCheckoutMethod, isLoading} = useMutation({
        mutationFn: async () => {
            const confirmResponse = await checkout.confirm();
            if (confirmResponse.type === "error") throw new Error(confirmResponse.error.message);
        }
    })

    return <Card>
        <CardHeader className="space-y-0.5">
            <CardTitle className="text-xl">Плащане с карта</CardTitle>
            <CardDescription className="text-[1rem]">Завърши бързо и сигурно твоята покупка</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-3">
                <p className="text-primary/70 mb-1">Продукти</p>
                <ul className="space-y-2">
                    {checkout.lineItems.map((item, index) => {
                        return <div
                            className="flex items-center justify-between flex-wrap text-sm"
                            key={index}
                        >
                            <div>- {item.name}</div>
                            <div>{item.total.amount}</div>
                        </div>
                    })}
                </ul>
            </div>
            <div className="mb-5">
                <p className="text-primary/70">Обща сума</p>
                <h1 className="text-2xl font-black uppercase">{checkout.total.total.amount}</h1>
            </div>
            <PaymentElement />
            <PrimaryButton
                className="w-full py-2 mt-3"
                loading={isLoading}
                onClick={() => confirmCheckoutMethod()}
            >
                Плащане
            </PrimaryButton>
        </CardContent>
    </Card>
}