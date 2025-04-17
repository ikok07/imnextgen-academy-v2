"use client"

import {SidebarProvider, useSidebar} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
import {IoMenuOutline} from "react-icons/io5";
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu
} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import Image from "next/image";
import {getNavLinks} from "@/app/_utils/nav/navlinks";
import DashboardSidebarGroupContent from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarGroupContent";
import DashboardSidebarAccountDropdownMenu
    from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarAccountDropdownMenu";
import {DecisionResults} from "@/src/application/services/auth/authorization.service.interface";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import DashboardSidebarSkeleton from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarSkeleton";

type DashboardSidebarClientWrapperProps = {
    results: DecisionResults
}

export default function DashboardSidebarClient(props: DashboardSidebarClientWrapperProps) {
    return <SidebarProvider>
        <InnerContent {...props} />
    </SidebarProvider>
}

export function InnerContent({results}: DashboardSidebarClientWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    const {openMobile, setOpenMobile} = useSidebar();

    if (!viewLoaded) return <DashboardSidebarSkeleton />

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
                        if (results.some(res => res.resourceId === group.id && res.actions["select"] === "EFFECT_ALLOW")) {
                            return <div key={index}>
                                <SidebarGroupLabel>
                                    {group.label}
                                </SidebarGroupLabel>
                                <SidebarGroupContent className="px-2">
                                    <SidebarMenu>
                                        <DashboardSidebarGroupContent group={group} results={results} />
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