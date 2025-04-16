import {
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem
} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {SIDEBAR_WIDTH} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function DashboardModuleSidebarSkeleton() {
    return <>
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
        <Skeleton className="md:hidden w-[5.6rem] h-[2rem] mt-10" />
    </>
}