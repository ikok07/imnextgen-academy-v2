import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {SidebarMenuSkeleton} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import DashboardModuleVideoFinishedVideoButtonSkeleton
    from "@/app/_components/dashboard/classroom/module/video/skeletons/DashboardModuleVideoFinishedVideoButtonSkeleton";

export default function DashboardModuleVideoInfoSkeleton() {
    return <div className="dashboard-module-video-info">
        <Card className="rounded-sm mt-3">
            <CardHeader className="flex lg:flex-row lg:items-center justify-between gap-3">
                <div className="flex-1 space-y-3">
                    <CardTitle>
                        <Skeleton className="w-[30%] h-[2rem]"/>
                    </CardTitle>
                    <CardDescription>
                        <Skeleton className="w-[40%] h-[0.9rem]"/>
                    </CardDescription>
                </div>
                <DashboardModuleVideoFinishedVideoButtonSkeleton />
            </CardHeader>
            <CardContent>
                {Array.from({length: 10}).map((_, index) => {
                    return <SidebarMenuSkeleton key={index} />
                })}
            </CardContent>
        </Card>
    </div>
}