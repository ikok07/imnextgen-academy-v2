import StripePaymentSheetSkeleton from "@/app/_components/dashboard/shop/payment/skeleton/StripePaymentSheetSkeleton";
import PaymentOptionSelectorSkeleton
    from "@/app/_components/dashboard/shop/payment/skeleton/PaymentOptionSelectorSkeleton";

export default function PaymentPageSkeleton() {
    return <>
        <PaymentOptionSelectorSkeleton />
        <StripePaymentSheetSkeleton />
    </>
}