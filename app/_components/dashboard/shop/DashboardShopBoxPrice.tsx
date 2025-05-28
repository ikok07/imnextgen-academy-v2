"use client"

import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoCart, IoCheckmarkCircle, IoCloseCircle} from "react-icons/io5";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getPaymentProductById} from "@/app/dashboard/shop/actions";
import {toast} from "sonner";
import {useShop} from "@/app/_providers/ShopProvider";
import DashboardShopBoxPriceSkeleton
    from "@/app/_components/dashboard/shop/skeletons/DashboardShopBoxPriceSkeleton";
import {useMemo} from "react";

type DashboardShopBoxPriceProps = {
    stripe_product_id: string,
    nonDiscountedPriceId: string | undefined,
    selected: boolean,
    isAcquired: boolean,
    isDisabled: boolean,
}

export default function DashboardShopBoxPrice({stripe_product_id, nonDiscountedPriceId, selected, isAcquired, isDisabled}: DashboardShopBoxPriceProps) {
    const {setErrorProductIds} = useShop();

    const {data: paymentProductQuery, isLoading, isError} = useErrorQuery({
        queryFn: () => getPaymentProductById(stripe_product_id),
        queryKey: [`product-${stripe_product_id}`],
        onError() {
            toast.error("Цената на абонамента не може да бъде заредена!");
            setErrorProductIds(v => v.add(stripe_product_id));
        }
    });

    let buttonIcon = useMemo(() => {
        if (selected || isAcquired) {
            return <IoCheckmarkCircle />
        }
        if (isDisabled) {
            return <IoCloseCircle />
        }
        return <IoCart/>;
    }, [isDisabled, selected, isAcquired]);

    const defaultPrice = useMemo(() => paymentProductQuery?.success ? paymentProductQuery?.value?.price ?? undefined : undefined, [paymentProductQuery]);
    const nonDiscountedPrice = useMemo(() => paymentProductQuery?.success && nonDiscountedPriceId ? (paymentProductQuery?.value?.secondaryPrices[nonDiscountedPriceId]) : undefined, [paymentProductQuery]);

    function getFormattedPrice(price: number) {
        return <><span>{Math.floor((price) / 100)}</span><span className="text-sm font-normal pb-1">.{((price) % 100).toString().padStart(2, '0')}</span></>
    }

    if (isLoading) return <DashboardShopBoxPriceSkeleton />

    if (!paymentProductQuery?.success || isError || !paymentProductQuery.value.price) return <div className="flex items-center gap-1 text-red-500">
        <IoCloseCircle />
        <h3>Възникна грешка!</h3>
    </div>;

    const nonDiscountedFormattedPrice = nonDiscountedPrice ? getFormattedPrice(nonDiscountedPrice) : <></>;
    const primaryFormattedPrice = getFormattedPrice(defaultPrice ?? 0);

    return <div className="flex items-center justify-between flex-wrap">
        <h1 className="relative flex items-end">
            {nonDiscountedPrice &&
                <span
                className="absolute -top-2 left-0 text-sm line-through decoration-cta text-primary/40"
                >
                    {nonDiscountedFormattedPrice} лв.
                </span>
            }
            <span className={`text-2xl font-black flex items-center gap-1 ${nonDiscountedPrice ? "pt-2 text-cta dark:text-primary" : ""}`}>{primaryFormattedPrice} лв.</span>
        </h1>
        <PrimaryButton
            className={`${isAcquired ? "bg-success-gradient" : isDisabled ? "bg-inactive-gradient text-primary" : selected ? "bg-inactive-gradient text-primary" : ""}`}
        >
            {buttonIcon}
        </PrimaryButton>
    </div>
}