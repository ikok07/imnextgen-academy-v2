"use client"

import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoCart, IoCheckmarkCircle, IoCloseCircle} from "react-icons/io5";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getPaymentProductById} from "@/app/dashboard/shop/actions";
import {toast} from "sonner";
import {useShop} from "@/app/_providers/ShopProvider";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {useMemo} from "react";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import DashboardShopSubscriptionBoxPriceSkeleton
    from "@/app/_components/dashboard/shop/subscription-box/skeletons/DashboardShopSubscriptionBoxPriceSkeleton";

type DashboardShopSubscriptionBoxPriceProps = {
    userSubscription: UserFullSubscription | undefined,
    fullTier: FullSubscriptionTier
}

export default function DashboardShopSubscriptionBoxPrice({userSubscription, fullTier}: DashboardShopSubscriptionBoxPriceProps) {
    const {selectedSubscriptionTier, setErrorProductIds} = useShop();

    const {data: paymentProductQuery, isLoading, isError} = useErrorQuery({
        queryFn: () => getPaymentProductById(fullTier.stripe_product_id),
        queryKey: [`product-${fullTier.stripe_product_id}`],
        onError() {
            toast.error("Цената на абонамента не може да бъде заредена!");
            setErrorProductIds(v => v.add(fullTier.stripe_product_id));
        }
    });

    const selected = useMemo(() => selectedSubscriptionTier?.id === fullTier.id, [selectedSubscriptionTier]);
    const alreadySubscribed = useMemo(() => userSubscription?.tier.id === fullTier.id, []);

    if (isLoading) return <DashboardShopSubscriptionBoxPriceSkeleton />

    if (!paymentProductQuery?.success || isError || !paymentProductQuery.value.price) return <div className="flex items-center gap-1 text-red-500">
        <IoCloseCircle />
        <h3>Възникна грешка!</h3>
    </div>;

    return <div className="flex items-center justify-between flex-wrap">
        <h1 className="flex items-end"><span className="text-2xl font-black">{Math.floor(paymentProductQuery.value.price / 100)}</span> <span className="text-sm font-normal pb-1">.{(paymentProductQuery.value.price % 100).toString().padStart(2, '0')} лв.</span></h1>
        <PrimaryButton
            className={`${alreadySubscribed ? "bg-success-gradient" : selected ? "bg-inactive-gradient text-primary" : ""}`}
        >
            {selected || alreadySubscribed ? <IoCheckmarkCircle /> : <IoCart/>}
        </PrimaryButton>
    </div>
}