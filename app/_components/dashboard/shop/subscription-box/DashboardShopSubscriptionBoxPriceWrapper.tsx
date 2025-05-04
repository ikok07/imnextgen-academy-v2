"use client"

import DashboardShopBoxPrice from "@/app/_components/dashboard/shop/DashboardShopBoxPrice";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {useMemo} from "react";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import {useShop} from "@/app/_providers/ShopProvider";

type DashboardShopSubscriptionBoxPriceWrapperProps = {
    userSubscription: UserFullSubscription | undefined,
    fullTier: FullSubscriptionTier,
}

export default function DashboardShopSubscriptionBoxPriceWrapper({userSubscription, fullTier}: DashboardShopSubscriptionBoxPriceWrapperProps) {
    const {selectedSubscriptionTier} = useShop();
    const selected = useMemo(() => selectedSubscriptionTier?.id === fullTier.id, [selectedSubscriptionTier]);
    const hasSubscription = !!userSubscription;
    const subscribedToTheSamePlan = useMemo(() => userSubscription?.tier.id === fullTier.id, []);

    return <DashboardShopBoxPrice
        stripe_product_id={fullTier.stripe_product_id}
        selected={selected}
        isAcquired={subscribedToTheSamePlan}
        isDisabled={hasSubscription && !subscribedToTheSamePlan}
    />
}