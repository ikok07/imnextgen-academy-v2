import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import DashboardShopSubscriptionBoxSkeleton
    from "@/app/_components/dashboard/shop/subscription-box/skeletons/DashboardShopSubscriptionBoxSkeleton";
import DashboardShopModuleBoxSkeleton
    from "@/app/_components/dashboard/shop/module-box/skeletons/DashboardShopModuleBoxSkeleton";

export default function DashboardShopSkeleton() {
    return <div className="space-y-3">
        <div>
            <Skeleton className="w-[10rem] h-[1.8rem] mb-3"/>
            <div className="grid grid-cols-3 gap-4">
                {Array.from({length: 3}).map((_, index) => {
                    return <DashboardShopSubscriptionBoxSkeleton key={index}/>
                })}
            </div>
        </div>
        <div>
            <Skeleton className="w-[10rem] h-[1.8rem] mb-3"/>
            <div className="grid grid-cols-3 gap-4">
                {Array.from({length: 3}).map((_, index) => {
                    return <DashboardShopModuleBoxSkeleton key={index}/>
                })}
            </div>
        </div>
    </div>
}