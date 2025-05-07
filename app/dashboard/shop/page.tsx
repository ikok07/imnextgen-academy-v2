import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import DashboardShopSubscriptionBox from "@/app/_components/dashboard/shop/subscription-box/DashboardShopSubscriptionBox";
import {getFullSubscriptionTiers, getPaidModules} from "@/app/dashboard/shop/actions";
import {getUserBoughtModules, getUserSubscription} from "@/app/actions";
import {getInjection} from "@/di/container";
import {Suspense} from "react";
import DashboardShopModuleBox from "@/app/_components/dashboard/shop/module-box/DashboardShopModuleBox";
import DashboardShopSkeleton from "@/app/_components/dashboard/shop/skeletons/DashboardShopSkeleton";
import DashboardShopGoToCartPopup from "@/app/_components/dashboard/shop/DashboardShopGoToCartPopup";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import {z} from "zod";

const pagePropsSchema = z.object({
    searchParams: z.object({
        productIds: z.string().optional()
    })
})

type PageProps = z.infer<typeof pagePropsSchema>;

export default async function Page({searchParams}: PageProps) {
    return <div>
        <DashboardShopGoToCartPopup initialProductIds={searchParams.productIds?.split(',')} />
        <div className="w-full min-h-[100vh] pb-20 xs:pb-14">
            <DashboardPageTitle>Магазин</DashboardPageTitle>
            <div className="w-[95%] max-w-[50rem] mx-auto">
                {/*<DashboardShopSkeleton />*/}
                <Suspense fallback={<DashboardShopSkeleton />}>
                    <InnerContent />
                </Suspense>
            </div>
        </div>
    </div>
}

async function InnerContent() {
    try {
        const userObject = await getInjection("IGetUserController")({excludeDbProfile: true});

        const [userSubscriptionResponse, fullSubscriptionTiersResponse, boughtModulesResponse, paidModulesResponse] = await Promise.all([
            getUserSubscription(userObject.user?.id),
            getFullSubscriptionTiers(),
            getUserBoughtModules(userObject.user?.id),
            getPaidModules()
        ]);

        if (!userSubscriptionResponse.success) throw new Error("User subscription is not available!");
        if (!fullSubscriptionTiersResponse.success) throw new Error("Subscription tiers are not available!");
        if (!boughtModulesResponse.success) throw new Error("Bought modules are not available!");
        if (!paidModulesResponse.success) throw new Error("Paid modules are not available!");

        return <div className="space-y-3 pb-3">
            <div>
                <h2 className="text-xl mb-4">Абонаменти</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fullSubscriptionTiersResponse.value.sort((a, b) => a.order_number - b.order_number).map((fullTier, index) => {
                        return <DashboardShopSubscriptionBox
                            userSubscription={userSubscriptionResponse.value}
                            fullTier={fullTier}
                            key={index}
                        />
                    })}
                </div>
            </div>
            <div>
                <h2 className="text-xl mb-4">Модули</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paidModulesResponse.value.filter(m => !!m.stripe_product_id).sort((a, b) => a.order_number - b.order_number).map((module, index) => {
                        return <DashboardShopModuleBox
                            module={{...module, stripe_product_id: module.stripe_product_id!}}
                            boughtModules={boughtModulesResponse.value}
                            key={index}
                        />
                    })}
                </div>
            </div>
        </div>
    } catch(e) {
        return <PrimaryErrorMessage
                Icon={IoCloudOffline}
                message="Продуктите не можаха да бъдат заредени"
                title="Възникна грешка"
            />
    }
}