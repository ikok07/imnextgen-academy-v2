"use client"

import DashboardShopBoxPrice from "@/app/_components/dashboard/shop/DashboardShopBoxPrice";
import {useMemo} from "react";
import {useShop} from "@/app/_providers/ShopProvider";
import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";

type DashboardShopModuleBoxPriceWrapperProps = {
    moduleId: string,
    stripeProductId: string,
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBoxPriceWrapper({moduleId, stripeProductId, boughtModules}: DashboardShopModuleBoxPriceWrapperProps) {
    const {selectedProductIds} = useShop();
    const selected = useMemo(() => selectedProductIds.has(stripeProductId), [selectedProductIds]);
    const alreadyBought = useMemo(() => boughtModules.some(m => m.module.id === moduleId), []);

    return <DashboardShopBoxPrice
        stripe_product_id={stripeProductId}
        selected={selected}
        isAcquired={alreadyBought}
    />
}