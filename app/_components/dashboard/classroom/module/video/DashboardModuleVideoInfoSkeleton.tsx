import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {SidebarMenuSkeleton} from "@/app/_components/ui/shadcn/sidebar/sidebar";

export default function DashboardModuleVideoInfoSkeleton() {
    return <div className="dashboard-module-video-info">
        <Card className="rounded-sm mt-3">
            <CardHeader>
                <CardTitle className="text-2xl">
                    <Skeleton className="w-[30%] h-[2rem]"/>
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-[40%] h-[0.9rem]"/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {Array.from({length: 10}).map((_, index) => {
                    return <SidebarMenuSkeleton key={index} />
                })}
            </CardContent>
        </Card>
    </div>
}