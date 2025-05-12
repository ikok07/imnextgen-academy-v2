"use client"

import {loadStripe} from "@stripe/stripe-js";
import {
    CheckoutProvider,
    PaymentElement,
    useCheckout,
} from "@stripe/react-stripe-js";
import {useTheme} from "next-themes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useEffect, useMemo, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {useDebounce} from "@react-hook/debounce";
import {Routes} from "@/app/_utils/nav/routes";
import {toast} from "sonner";
import StripePaymentSheetSkeleton from "@/app/_components/dashboard/shop/payment/skeleton/StripePaymentSheetSkeleton";
import {createCheckoutSession} from "@/app/dashboard/shop/actions";
import {CheckoutMode} from "@/src/application/services/payments/payment.service.interface";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {locale: "bg"});

type StripePaymentSheetProps = {
    productIds: string[],
    email: string | undefined,
    phoneNumber: string,
    customerId: string | undefined,
    mode: CheckoutMode,
    subscriptionMetadata: Record<string, string> | undefined
}


export default function StripePaymentSheet(props: StripePaymentSheetProps) {
    const {resolvedTheme} = useTheme();

    const promise = async () => {
        const clientSecretResponse = await createCheckoutSession({
            productIds: props.productIds,
            customerId: props.customerId || undefined,
            customerEmail: props.email,
            locale: "bg",
            mode: props.mode,
            returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${Routes.dashboard.shop.paymentSuccess()}`,
            subscriptionMetadata: props.subscriptionMetadata,
            clientSecretOnly: true
        });
        if (!clientSecretResponse.success) throw new Error("Checkout session is not available!");
        return clientSecretResponse.value as string ?? "";
    }

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

function InnerContent({phoneNumber}: StripePaymentSheetProps) {
    const checkout = useCheckout();
    const [promoCode, setPromoCode] = useState<string | null>(null);
    const [debouncedPromoCode, setDebouncedPromoCode] = useDebounce<string | null>(null, 1000);
    const [promoCodeError, setPromoCodeError] = useState<string | null>(null);

    const discountAmount = useMemo(() => {
        if (checkout.discountAmounts) {
            let total = 0;
            checkout.discountAmounts.forEach(amount => total += amount.minorUnitsAmount);
            return total / 100;
        }
    }, [checkout.discountAmounts?.length])

    // Cannot be inside server action!
    const {mutate: confirmCheckoutMethod, isLoading} = useMutation({
        mutationFn: async () => {
            const phoneNumberResponse = await checkout.updatePhoneNumber(phoneNumber);
            if (phoneNumberResponse.type === "error") throw new Error("Invalid phone number!");
            const confirmResponse = await checkout.confirm();
            if (confirmResponse.type === "error") throw new Error(confirmResponse.error.message);
        },
        onError(e: Error) {
            toast.error(e.message);
        }
    });

    const {mutate: applyPromoCodeMethod, isLoading: isApplyingPromoCode} = useMutation({
        mutationFn: async (promoCode: string) => {
            const response = await checkout.applyPromotionCode(promoCode);
            if (response.type === "error") throw new Error(response.error.message);
            setPromoCodeError(null);
        },
        onError(e: Error) {
            setPromoCodeError(e.message);
            checkout.removePromotionCode();
        }
    })

    useEffect(() => {
        if (promoCode) {
            setDebouncedPromoCode(promoCode);
        } else {
            setPromoCodeError(null);
            setDebouncedPromoCode(null);
            checkout.removePromotionCode();
        }
    }, [promoCode]);

    useEffect(() => {
        if (debouncedPromoCode) applyPromoCodeMethod(debouncedPromoCode);
    }, [debouncedPromoCode]);

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
                            <div className="font-bold">
                                {item.total.amount}
                                {checkout?.discountAmounts && checkout.discountAmounts[index] && <span className="text-sm text-cta">(-{checkout.discountAmounts[index].percentOff}%)</span>}
                            </div>
                        </div>
                    })}
                </ul>
            </div>
            <div className="mb-5">
                <p className="text-primary/70">Обща сума</p>
                <h1 className="text-2xl font-black uppercase">
                    {checkout.total.total.amount}
                    {discountAmount && discountAmount > 0 ? <span className="text-sm text-cta"> (-{discountAmount.toFixed(2)} {checkout.currency})</span> : ""}
                </h1>
            </div>
            <div className="mb-3">
                <PrimaryInput
                    label="Промокод"
                    placeholder="Опционален код за отстъпка"
                    value={promoCode ?? ""}
                    onChange={(e: any) => setPromoCode(e.target.value)}
                    error={promoCodeError ?? undefined}
                    disabled={isApplyingPromoCode}
                />
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