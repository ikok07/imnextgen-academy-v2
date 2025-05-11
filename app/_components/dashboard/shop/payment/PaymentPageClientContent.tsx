"use client"

import StripePaymentSheet from "@/app/_components/dashboard/shop/payment/StripePaymentSheet";
import PaymentOptionSelector from "@/app/_components/dashboard/shop/payment/PaymentOptionSelector";
import {PaymentOption, usePaymentPage} from "@/app/_providers/PaymentPageProvider";
import DSKBankCreditForm from "./bank/dsk/DSKBankCreditForm";
import {useEffect} from "react";
import {Routes} from "@/app/_utils/nav/routes";
import {useShop} from "@/app/_providers/ShopProvider";
import {useRouter} from "next/navigation";

type PaymentPageClientContentProps = {
    productIds: string[],
    email: string | undefined,
    customerId: string | undefined,
    phoneNumber: string,
    userHasSubscription: boolean,
    hasSubscriptionSearchParam: string,
    tierId: string | undefined
}

export default function PaymentPageClientContent({productIds, email, customerId, phoneNumber, userHasSubscription, hasSubscriptionSearchParam, tierId}: PaymentPageClientContentProps) {
    const {selectedSubscriptionTier, selectedProductIds} = useShop();
    const router = useRouter();
    const {selectedPaymentOption} = usePaymentPage();

    function generateAnimationClasses(paymentOption: PaymentOption) {
        return `${selectedPaymentOption !== paymentOption ? "hidden" : ""} animate-in slide-in-from-left-2 ease-in-out fade-in duration-300`
    }

    useEffect(() => {
        // if (!selectedSubscriptionTier && selectedProductIds.size === 0) {
        //     router.push(Routes.dashboard.shop.base());
        // }
    }, []);

    return <>
        <PaymentOptionSelector />
        <div className={generateAnimationClasses("credit-dsk")}>
            <DSKBankCreditForm productIds={productIds} />
        </div>
        <div className={generateAnimationClasses("pay-stripe")}>
            <StripePaymentSheet
                productIds={productIds}
                email={email}
                customerId={customerId}
                phoneNumber={phoneNumber}
                mode={!userHasSubscription && hasSubscriptionSearchParam === "true" ? "subscription" : "payment"}
                subscriptionMetadata={tierId ? {tierId} : undefined}
            />
        </div>
    </>
}