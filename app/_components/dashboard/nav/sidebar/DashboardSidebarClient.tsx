"use client"

import {SidebarProvider, useSidebar} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
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
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/_hooks/redux";
import {setDashboardLoaded, setDashboardMobileSidebarOpen} from "@/app/_store/slices/dashboardSidebar";
import {useTheme} from "next-themes";

type DashboardSidebarClientWrapperProps = {
    results: DecisionResults
}

export default function DashboardSidebarClient(props: DashboardSidebarClientWrapperProps) {
    return <SidebarProvider>
        <InnerContent {...props} />
    </SidebarProvider>
}

function InnerContent({results}: DashboardSidebarClientWrapperProps) {
    const {dashboardMobileSidebarOpen} = useAppSelector(state => state.dashboardSidebar);
    const dispatch = useAppDispatch();
    const {resolvedTheme} = useTheme();

    const {viewLoaded} = useViewLoaded({
        onLoaded() {
            dispatch(setDashboardLoaded(true));
        }
    });

    const {openMobile, setOpenMobile} = useSidebar();

    useEffect(() => {
        if (openMobile != dashboardMobileSidebarOpen) {
            setOpenMobile(dashboardMobileSidebarOpen);
        }
    }, [dashboardMobileSidebarOpen]);

    useEffect(() => {
        if (openMobile != dashboardMobileSidebarOpen) {
            dispatch(setDashboardMobileSidebarOpen(openMobile));
        }
    }, [openMobile]);

    if (!viewLoaded) return <DashboardSidebarSkeleton />

    return <div className="flex">
        <Sidebar
            variant="inset"
        >
            <SidebarHeader>
                <div className="grid">
                    <div><Image alt="I&M NextGen Academy" src={resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png"} width={200} height={60} /></div>
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
    </div>
}