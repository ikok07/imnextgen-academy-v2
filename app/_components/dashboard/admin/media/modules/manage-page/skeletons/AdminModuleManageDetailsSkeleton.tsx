import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminModuleManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManagePageHeaderButtons";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import AdminModuleManageDetailsContainerSkeleton
    from "@/app/_components/dashboard/admin/media/modules/manage-page/skeletons/AdminModuleManageDetailsContainerSkeleton";

export default function AdminModuleManageDetailsSkeleton() {
    return <Card>
        <CardHeader className="py-0 pt-3 grid sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
            <div className="row-start-2 sm:row-start-1">
                <Skeleton className="w-[40%] h-[2rem]"/>
                <Skeleton className="w-full h-[0.5rem] mt-3 mb-1" />
                <Skeleton className="w-[50%] h-[0.5rem]" />
            </div>
            <div className="w-[12rem] h-[2rem] grid grid-cols-[1fr_1.5fr] items-center gap-2">
                <Skeleton className="w-full h-full" />
                <Skeleton className="w-full h-full" />
            </div>
        </CardHeader>
        <CardContent>
            <AdminModuleManageDetailsContainerSkeleton />
        </CardContent>
    </Card>
}