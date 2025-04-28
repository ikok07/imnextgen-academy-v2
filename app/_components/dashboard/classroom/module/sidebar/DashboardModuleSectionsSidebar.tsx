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
import {SidebarProvider, useSidebar} from "@/app/_components/ui/shadcn/sidebar/sidebar-provider";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import DashboardModuleSidebarSkeleton
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSidebarSkeleton";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {FinishedVideosResponse} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFinishedVideos} from "@/app/dashboard/actions";
import {ServerActionResult} from "@/app/_utils/createServerAction";
import {VideosForModuleResponse} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";

type DashboardModuleSectionsSidebarProps = {
    userId: string,
    moduleId: string,
    moduleTitle: string,
    videosForModule: VideosForModuleResponse,
    finishedVideosResult: ServerActionResult<FinishedVideosResponse>
}

export default function DashboardModuleSectionsSidebar(props: DashboardModuleSectionsSidebarProps) {
    return <SidebarProvider className="min-h-auto video-column-width" sidebarWidth="10rem">
        <InnerContent {...props} />
    </SidebarProvider>
}

function InnerContent({userId, moduleId, moduleTitle, videosForModule, finishedVideosResult}: DashboardModuleSectionsSidebarProps) {
    const {setOpenMobile} = useSidebar();
    const {viewLoaded} = useViewLoaded();

    const {data: finishedVideosQuery} = useErrorQuery({
        queryFn: () => getFinishedVideos(moduleId, userId),
        queryKey: ["finished-videos"],
        initialData: finishedVideosResult
    });

    const finishedVideos = finishedVideosQuery?.success ? finishedVideosQuery.value.finishedVideos : [];
    const percentage = finishedVideosQuery?.success ? finishedVideosQuery.value.percentage : 0;

    if (!viewLoaded) return <DashboardModuleSidebarSkeleton />

    return <div className="flex">
        <Sidebar
            className="relative w-full h-full"
        >
            <SidebarHeader className="mt-3 my-1 md:mt-0">
                <Link href={Routes.dashboard.classroom.base}>
                    <div className="cursor-pointer flex items-center gap-2 group/header h-max text-primary/70 hover:text-primary transition-all duration-200">
                        <IoChevronBack className="text-lg"/>
                        <h3 className="">{moduleTitle}</h3>
                    </div>
                </Link>
            </SidebarHeader>
            <DashboardModuleSectionsSidebarContent videosForModule={videosForModule} finishedVideos={finishedVideos} />
            <DashboardModuleSectionsSidebarFooter progress={percentage} />
        </Sidebar>
        <SecondaryButton className="md:hidden" onClick={() => setOpenMobile(true)}>
            <IoList />
            Съдържание
        </SecondaryButton>
    </div>
}