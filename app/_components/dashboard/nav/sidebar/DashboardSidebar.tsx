"use client"

import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu,
    SidebarProvider, useSidebar
} from "@/app/_components/ui/shadcn/sidebar";
import Image from "next/image";
import DashboardSidebarAccountDropdownMenu
    from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarAccountDropdownMenu";
import {getNavlinkAuthResources, getNavLinks} from "@/app/_utils/nav/navlinks";
import DashboardSidebarGroupContent from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarGroupContent";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import { useMultipleAccess } from "@/app/_hooks/auth/useMultipleAccess";
import {IoMenuOutline} from "react-icons/io5";

export default function DashboardSidebar() {
    return <SidebarProvider>
        <InnerContent />
    </SidebarProvider>
}

export function InnerContent() {
    const {userObject} = useAppUser();
    const {openMobile, setOpenMobile} = useSidebar();

    const {results, isLoading} = useMultipleAccess({
        principal: {
            id: userObject.user?.id!,
            roles: userObject.user?.publicMetadata["roles"] as string[]
        },
        resources: getNavlinkAuthResources(),
        enabled: !!userObject.user
    })

    return <div className="flex">
        <Sidebar
            variant="inset"
        >
            <SidebarHeader>
                <div className="grid">
                    <div><Image alt="I&M NextGen Academy" src="/logo.png" width={200} height={60} /></div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarContent>
                    {getNavLinks().map((group, index) => {
                        if (isLoading || results.some(res => res.resourceId === group.id && res.actions["select"] === "EFFECT_ALLOW")) {
                            return <div key={index}>
                                <SidebarGroupLabel>
                                    {isLoading ? <Skeleton className="h-2 w-[7rem]" /> : group.label}
                                </SidebarGroupLabel>
                                <SidebarGroupContent className="px-2">
                                    <SidebarMenu>
                                        <DashboardSidebarGroupContent group={group} results={results} isLoading={isLoading}/>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </div>
                        }
                    })}
                </SidebarContent>
            </SidebarContent>
            <SidebarFooter>
                <DashboardSidebarAccountDropdownMenu />
            </SidebarFooter>
        </Sidebar>
        <button className="visible md:hidden text-3xl ml-3 mt-3 h-max" onClick={() => setOpenMobile(!openMobile)}><IoMenuOutline /></button>
    </div>
}