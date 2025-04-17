"use client"

import {
    Sidebar,
    SidebarHeader,
} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {IoChevronBack, IoList} from "react-icons/io5";
import DashboardModuleSectionsSidebarFooter
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSectionsSidebarFooter";
import Link from "next/link";
import {Routes} from "@/app/_utils/nav/routes";
import DashboardModuleSectionsSidebarContent
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSectionsSidebarContent";
import {VideosForModuleResponse} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {SidebarProvider, useSidebar} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import DashboardModuleSidebarSkeleton
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSidebarSkeleton";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {FinishedVideosResponse} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

type DashboardModuleSectionsSidebarProps = {
    moduleTitle: string,
    videosForModule: VideosForModuleResponse,
    finishedVideos: FinishedVideosResponse
}

export default function DashboardModuleSectionsSidebar(props: DashboardModuleSectionsSidebarProps) {
    return <SidebarProvider className="min-h-auto md:h-[calc(100vh-3.2rem)]">
        <InnerContent {...props} />
    </SidebarProvider>
}

function InnerContent({moduleTitle, videosForModule, finishedVideos}: DashboardModuleSectionsSidebarProps) {
    const {setOpenMobile} = useSidebar();
    const {viewLoaded} = useViewLoaded();

    if (!viewLoaded) return <DashboardModuleSidebarSkeleton />

    return <div className="flex">
        <Sidebar
            className="relative w-full h-full"
        >
            <SidebarHeader className="mt-3 my-1 md:mt-0">
                <Link href={Routes.dashboard.base}>
                    <div className="cursor-pointer flex items-center gap-2 group/header h-max text-primary/70 hover:text-primary transition-all duration-200">
                        <IoChevronBack className="text-lg"/>
                        <h3 className="">{moduleTitle}</h3>
                    </div>
                </Link>
            </SidebarHeader>
            <DashboardModuleSectionsSidebarContent videosForModule={videosForModule} finishedVideos={finishedVideos.finishedVideos} />
            <DashboardModuleSectionsSidebarFooter progress={finishedVideos.percentage} />
        </Sidebar>
        <SecondaryButton className="md:hidden" onClick={() => setOpenMobile(true)}>
            <IoList />
            Съдържание
        </SecondaryButton>
    </div>
}