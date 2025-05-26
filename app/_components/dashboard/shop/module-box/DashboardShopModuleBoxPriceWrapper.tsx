"use client"

import DashboardShopBoxPrice from "@/app/_components/dashboard/shop/DashboardShopBoxPrice";
import {useMemo} from "react";
import {useShop} from "@/app/_providers/ShopProvider";
import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";
import {Module} from "@/drizzle/schema/modules";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";

type DashboardShopModuleBoxPriceWrapperProps = {
    userSubscription: UserFullSubscription | undefined,
    module: Module,
    stripeProductId: string,
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBoxPriceWrapper({userSubscription, module, stripeProductId, boughtModules}: DashboardShopModuleBoxPriceWrapperProps) {
    const {selectedProductIds, alreadyBought, moduleIncludedInSelectedSubscription} = useShop();
    const selected = useMemo(() => selectedProductIds.has(stripeProductId), [selectedProductIds]);

    return <DashboardShopBoxPrice
        stripe_product_id={stripeProductId}
        selected={selected}
        isAcquired={alreadyBought(boughtModules, module.id)}
        isDisabled={moduleIncludedInSelectedSubscription(module, userSubscription)}
    />
}