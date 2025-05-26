"use client"

import {ReactNode, useMemo} from "react";
import {useShop} from "@/app/_providers/ShopProvider";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {UserBoughtModule} from "@/drizzle/schema/user_bought_modules";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";
import {Module} from "@/drizzle/schema/modules";

type DashboardShopModuleBoxClientWrapperProps = {
    children: ReactNode,
    userSubscription: UserFullSubscription | undefined,
    module: Module,
    stripeProductId: string,
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBoxClientWrapper({children, userSubscription, module, stripeProductId, boughtModules}: DashboardShopModuleBoxClientWrapperProps) {
    const {setSelectedProductIds, errorProductIds, alreadyBought, moduleIncludedInSelectedSubscription} = useShop();

    const moduleIncludedInSubscription = moduleIncludedInSelectedSubscription(module, userSubscription);
    const alreadyPurchased = alreadyBought(boughtModules, module.id);

    if (alreadyPurchased || moduleIncludedInSubscription) {
        return <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="text-left">
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{alreadyPurchased ? "Вече притежаваш този продукт" : "Модулът е включен в избрания или закупен от теб абонамент"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    }

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