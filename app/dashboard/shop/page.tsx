import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import DashboardShopSubscriptionBox from "@/app/_components/dashboard/shop/subscription-box/DashboardShopSubscriptionBox";
import {getFullSubscriptionTiers} from "@/app/dashboard/shop/actions";
import {getUserSubscription} from "@/app/actions";
import {getInjection} from "@/di/container";
import {Suspense} from "react";
import DashboardShopSkeleton
    from "@/app/_components/dashboard/shop/subscription-box/skeletons/DashboardShopSkeleton";

export default async function Page() {
    return <div className="w-full min-h-[100vh]">
        <DashboardPageTitle>Магазин</DashboardPageTitle>
        <div className="w-[95%] max-w-[50rem] mx-auto">
            {/*<DashboardShopSkeleton />*/}
            <Suspense fallback={<DashboardShopSkeleton />}>
                <InnerContent />
            </Suspense>
        </div>
    </div>
}

export async function InnerContent() {
    const userObject = await getInjection("IGetUserController")({excludeDbProfile: true});

    const [userSubscriptionResponse, fullSubscriptionTiersResponse] = await Promise.all([getUserSubscription(userObject.user?.id), getFullSubscriptionTiers()])
    if (!userSubscriptionResponse.success) throw new Error("User subscription is not available!");
    if (!fullSubscriptionTiersResponse.success) throw new Error("Subscription tiers are not available!");

    return <div>
        <div>
            <h2 className="text-xl mb-3">Абонаменти</h2>
            <div className="grid grid-cols-3 gap-4">
                {fullSubscriptionTiersResponse.value.sort((a, b) => a.order_number - b.order_number).map((fullTier, index) => {
                    return <DashboardShopSubscriptionBox
                        userSubscription={userSubscriptionResponse.value}
                        fullTier={fullTier}
                        key={index}
                    />
                })}
            </div>
        </div>
    </div>
}