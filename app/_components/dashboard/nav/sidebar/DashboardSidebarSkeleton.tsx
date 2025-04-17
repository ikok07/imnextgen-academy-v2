import {SidebarMenuSkeleton} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardSidebarSkeleton() {
    return <>
        <div className="hidden md:flex p-4 flex-col justify-between">
            <div>
                <Skeleton className="w-[200px] h-[60px]"/>
                <Skeleton className="mt-5 mb-1 w-[40%] h-[0.5rem]"/>
                {Array.from({length: 3}).map((_, index) => {
                    return <SidebarMenuSkeleton key={index} />
                })}
            </div>
            <Skeleton className="w-full h-[2rem]" />
        </div>
        <Skeleton className="visible md:hidden ml-2 mt-2 w-[2.3rem] h-[2.3rem]" />
    </>
}