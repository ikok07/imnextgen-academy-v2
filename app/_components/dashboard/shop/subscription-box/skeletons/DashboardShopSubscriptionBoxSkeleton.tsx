import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import DashboardShopSubscriptionBoxPriceSkeleton
    from "@/app/_components/dashboard/shop/subscription-box/skeletons/DashboardShopSubscriptionBoxPriceSkeleton";

export default function DashboardShopSubscriptionBoxSkeleton() {
    return <Card className="flex flex-col justify-between">
        <CardHeader className="pt-3 pb-0">
            <Skeleton className="w-[2rem] h-[2rem] mb-1" />
            <CardTitle><Skeleton className="w-[5rem] h-[1.2rem]"/></CardTitle>
            <CardDescription><Skeleton className="w-[10rem] h-[0.7rem]"/></CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="py-3 text-sm list-disc list-inside space-y-3">
                {Array.from({length: 3}).map((_, index) => {
                    return <Skeleton className="w-[7rem] h-[0.7rem]" key={index}/>
                })}
            </ul>
            <DashboardShopSubscriptionBoxPriceSkeleton />
        </CardContent>
    </Card>
}