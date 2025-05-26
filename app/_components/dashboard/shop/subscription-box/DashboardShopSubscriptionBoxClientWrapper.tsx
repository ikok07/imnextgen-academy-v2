"use client"

import {ReactNode, useMemo} from "react";
import {useShop} from "@/app/_providers/ShopProvider";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";

type DashboardShopSubscriptionBoxClientWrapperProps = {
    userSubscription: UserFullSubscription | undefined,
    fullTier: FullSubscriptionTier,
    children: ReactNode,
}

export default function DashboardShopSubscriptionBoxClientWrapper({userSubscription, fullTier, children}: DashboardShopSubscriptionBoxClientWrapperProps) {
    const {selectedSubscriptionTier, setSelectedSubscriptionTier, errorProductIds} = useShop();

    const alreadySubscribed = !!userSubscription;

    if (alreadySubscribed) {
        return <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="text-left">
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Вече имаш активен абонамент. В случай, че искаш да го промениш, е необходимо да го прекратиш преди да закупиш нов.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    }

    return <div onClick={() => {
        if (!errorProductIds.has(fullTier.stripe_product_id)) {
            setSelectedSubscriptionTier(selectedSubscriptionTier?.id === fullTier.id ? null : fullTier);
        }
    }}>
        {children}
    </div>
}