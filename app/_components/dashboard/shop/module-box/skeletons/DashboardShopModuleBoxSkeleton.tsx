import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import DashboardShopBoxPriceSkeleton from "../../skeletons/DashboardShopBoxPriceSkeleton";

export default function DashboardShopModuleBoxSkeleton() {
    return <Card className="flex flex-col justify-between">
        <Skeleton className="w-full aspect-video" />
        <CardHeader className="pt-3 pb-0">
            <CardTitle><Skeleton className="w-[5rem] h-[1.2rem]"/></CardTitle>
            <CardDescription><Skeleton className="w-[10rem] h-[0.7rem]"/></CardDescription>
        </CardHeader>
        <CardContent className="mt-3">
            <DashboardShopBoxPriceSkeleton />
        </CardContent>
    </Card>
}