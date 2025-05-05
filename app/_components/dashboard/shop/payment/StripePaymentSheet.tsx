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
import {useMutation} from "react-query";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {useShop} from "@/app/_providers/ShopProvider";
import {useRouter} from "next/navigation";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {useDebounce} from "@react-hook/debounce";
import {Routes} from "@/app/_utils/nav/routes";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PaymentSheetSkeleton from "@/app/_components/dashboard/shop/payment/PaymentSheetSkeleton";
import {toast} from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!, {locale: "bg"});

type StripePaymentSheetProps = {
    clientSecret: string | null,
    phoneNumber: string
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
        <InnerContent {...props} />
    </CheckoutProvider>
}

function InnerContent({phoneNumber}: StripePaymentSheetProps) {
    const {viewLoaded} = useViewLoaded();
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
        }
    })

    useEffect(() => {
        if (promoCode) {
            setDebouncedPromoCode(promoCode);
        } else {
            setPromoCodeError(null);
            setDebouncedPromoCode(null);
        }
    }, [promoCode]);

    useEffect(() => {
        if (debouncedPromoCode) applyPromoCodeMethod(debouncedPromoCode);
    }, [debouncedPromoCode]);

    if (!viewLoaded) return <PaymentSheetSkeleton />

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