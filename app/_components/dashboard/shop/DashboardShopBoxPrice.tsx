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
    selected: boolean,
    isAcquired: boolean,
    isDisabled: boolean,
}

export default function DashboardShopBoxPrice({stripe_product_id, selected, isAcquired, isDisabled}: DashboardShopBoxPriceProps) {
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
        if (isDisabled) {
            return <IoCloseCircle />
        }
        if (selected || isAcquired) {
            return <IoCheckmarkCircle />
        }
        return <IoCart/>;
    }, [isDisabled, selected, isAcquired]);

    if (isLoading) return <DashboardShopBoxPriceSkeleton />

    if (!paymentProductQuery?.success || isError || !paymentProductQuery.value.price) return <div className="flex items-center gap-1 text-red-500">
        <IoCloseCircle />
        <h3>Възникна грешка!</h3>
    </div>;

    return <div className="flex items-center justify-between flex-wrap">
        <h1 className="flex items-end"><span className="text-2xl font-black">{Math.floor(paymentProductQuery.value.price / 100)}</span> <span className="text-sm font-normal pb-1">.{(paymentProductQuery.value.price % 100).toString().padStart(2, '0')} лв.</span></h1>
        <PrimaryButton
            className={`${isDisabled ? "bg-inactive-gradient text-primary" : isAcquired ? "bg-success-gradient" : selected ? "bg-inactive-gradient text-primary" : ""}`}
        >
            {buttonIcon}
        </PrimaryButton>
    </div>
}