import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../../ui/shadcn/card";
import {IoCheckmarkCircle} from "react-icons/io5";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import DashboardShopSubscriptionBoxClientWrapper
    from "@/app/_components/dashboard/shop/subscription-box/DashboardShopSubscriptionBoxClientWrapper";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";
import DashboardShopSubscriptionBoxPriceWrapper
    from "@/app/_components/dashboard/shop/subscription-box/DashboardShopSubscriptionBoxPriceWrapper";

type DashboardShopSubscriptionBoxProps = {
    userSubscription: UserFullSubscription | undefined,
    fullTier: FullSubscriptionTier
}

export default function DashboardShopSubscriptionBox({userSubscription, fullTier}: DashboardShopSubscriptionBoxProps) {
    return <DashboardShopSubscriptionBoxClientWrapper
        userSubscription={userSubscription}
        fullTier={fullTier}
    >
        <Card className="cursor-pointer flex flex-col justify-between hover:bg-secondary/70 dark:hover:bg-border/50">
            <CardHeader className="pt-3 pb-0">
                <h1 className="text-3xl font-black text-cta opacity-70">{fullTier.order_number}.</h1>
                <CardTitle>{fullTier.title}</CardTitle>
                <CardDescription className="line-clamp-2">{fullTier.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="py-3 text-sm list-disc list-inside space-y-3">
                    {fullTier.perks.sort((a, b) => a.order_number - b.order_number).map((perk, index) => {
                        return <li className="grid grid-cols-[auto_1fr] items-center gap-2 font-medium" key={index}>
                            <IoCheckmarkCircle className="text-lg text-cta" />
                            {perk.content}
                        </li>
                    })}
                </ul>
                <DashboardShopSubscriptionBoxPriceWrapper
                    userSubscription={userSubscription}
                    fullTier={fullTier}
                />
            </CardContent>
        </Card>
    </DashboardShopSubscriptionBoxClientWrapper>
}