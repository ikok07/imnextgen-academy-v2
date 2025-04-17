import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem
} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {SIDEBAR_WIDTH} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardModuleSidebarSkeleton() {
    return <div className="flex flex-col justify-between">
        <div>
            <SidebarMenu className="hidden md:block border-r border-sidebar-border mt-10" style={{width: SIDEBAR_WIDTH}}>
                {Array.from({length: 2}).map((_, index) => {
                    return <>
                        <SidebarMenuItem key={index}>
                            <SidebarMenuSkeleton />
                        </SidebarMenuItem>
                        <SidebarMenuSub>
                            {Array.from({length: 4}).map((_, index) => {
                                return <SidebarMenuSubItem key={index}>
                                    <SidebarMenuSkeleton />
                                </SidebarMenuSubItem>
                            })}
                        </SidebarMenuSub>
                    </>
                })}
            </SidebarMenu>
            <Skeleton className="md:hidden w-[5.6rem] h-[2rem]" />
        </div>
        <div className="hidden md:block space-y-1 py-3 w-full">
            <div className="flex items-center justify-between">
                <Skeleton className="w-[4.5rem] h-[0.9rem]" />
                <Skeleton className="w-[2rem] h-[0.9rem]" />
            </div>
            <Skeleton className="w-full h-[0.5rem]"/>
        </div>
    </div>
}