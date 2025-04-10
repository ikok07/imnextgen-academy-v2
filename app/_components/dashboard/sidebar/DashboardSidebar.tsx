"use client"

import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu,
    SidebarProvider
} from "@/app/_components/ui/shadcn/sidebar";
import Image from "next/image";
import DashboardSidebarAccountDropdownMenu
    from "@/app/_components/dashboard/sidebar/DashboardSidebarAccountDropdownMenu";
import {getNavlinkAuthResources, getNavLinks} from "@/app/_utils/nav/navlinks";
import DashboardSidebarGroupContent from "@/app/_components/dashboard/sidebar/DashboardSidebarGroupContent";
import {useState} from "react";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {useAppUser} from "@/app/_hooks/auth/useUser";
import { useMultipleAccess } from "@/app/_hooks/auth/useMultipleAccess";

export default function DashboardSidebar() {
    const {userObject} = useAppUser();
    const [isLoading, setIsLoading] = useState(false);

    const {} = useMultipleAccess({
        principal: {
            id: userObject.user?.id!,
            roles: userObject.user?.publicMetadata["roles"] as string[]
        },
        resources: getNavlinkAuthResources(),
        enabled: !!userObject.user
    })

    return <SidebarProvider>
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
                        return <div key={index}>
                            <SidebarGroupLabel>
                                {isLoading ? <Skeleton className="h-2 w-[7rem]" /> : group.label}
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <DashboardSidebarGroupContent group={group} isLoading={isLoading}/>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </div>
                    })}
                </SidebarContent>
            </SidebarContent>
            <SidebarFooter>
                <DashboardSidebarAccountDropdownMenu />
            </SidebarFooter>
        </Sidebar>
    </SidebarProvider>
}