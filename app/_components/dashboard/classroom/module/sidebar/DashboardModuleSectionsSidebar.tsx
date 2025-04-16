"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider
} from "@/app/_components/ui/shadcn/sidebar";
import {IoChevronBack} from "react-icons/io5";
import DashboardModuleSectionsSidebarFooter
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSectionsSidebarFooter";
import Link from "next/link";
import {Routes} from "@/app/_utils/nav/routes";

type DashboardModuleSectionsSidebarProps = {
    moduleId: string,
    moduleTitle: string
}

export default function DashboardModuleSectionsSidebar(props: DashboardModuleSectionsSidebarProps) {
    return <SidebarProvider className="min-h-auto h-[calc(100vh-4rem)]">
        <InnerContent {...props} />
    </SidebarProvider>
}

function InnerContent({moduleId, moduleTitle}: DashboardModuleSectionsSidebarProps) {
    return <Sidebar
        className="relative w-full h-full"
    >
        <SidebarHeader>
            <Link href={Routes.dashboard.base}>
                <div className="cursor-pointer flex items-center gap-2 group/header h-max text-primary/70 hover:text-primary transition-all duration-200">
                    <IoChevronBack className="text-lg"/>
                    <h3 className="">{moduleTitle}</h3>
                </div>
            </Link>
        </SidebarHeader>
        <SidebarContent
            className="flex-1 max-h-full overflow-y-auto"
        >

        </SidebarContent>
        <DashboardModuleSectionsSidebarFooter moduleId={moduleId} />
    </Sidebar>
}