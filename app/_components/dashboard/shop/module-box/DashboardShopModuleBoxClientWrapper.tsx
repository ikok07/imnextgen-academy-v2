"use client"

import {ReactNode, useMemo} from "react";
import {useShop} from "@/app/_providers/ShopProvider";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";

type DashboardShopModuleBoxClientWrapperProps = {
    children: ReactNode,
    moduleId: string,
    stripeProductId: string,
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBoxClientWrapper({children, moduleId, stripeProductId, boughtModules}: DashboardShopModuleBoxClientWrapperProps) {
    const {selectedProductIds, setSelectedProductIds, errorProductIds} = useShop();

    const alreadyPurchased = useMemo(() => boughtModules.some(m => m.module.id === moduleId), []);

    if (alreadyPurchased) {
        return <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="text-left">
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Вече притежаваш този продукт</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    }
    console.log(selectedProductIds.has(stripeProductId));
    return <div
        onClick={() => {
            if (!errorProductIds.has(stripeProductId)) {
                setSelectedProductIds( prev => {
                    const newSet = new Set(prev);

                    if (newSet.has(stripeProductId)) {
                        newSet.delete(stripeProductId);
                    } else {
                        newSet.add(stripeProductId);
                    }

                    return newSet;
                });
            }
        }}>
        {children}
    </div>
}