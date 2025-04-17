"use client"

import {
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubItem
} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {IoCheckmarkCircle, IoChevronDown} from "react-icons/io5";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/app/_components/ui/shadcn/collapsible";
import {VideosForModuleResponse} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {useModule} from "@/app/_providers/ModuleProvider";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {FinishedVideo} from "@/drizzle/schema/finished_videos";

type DashboardModuleSectionsSidebarContentProps = {
    videosForModule: VideosForModuleResponse,
    finishedVideos: FinishedVideo[]
}

export default function DashboardModuleSectionsSidebarContent({videosForModule, finishedVideos}: DashboardModuleSectionsSidebarContentProps) {
    const {activeSectionId, selectSection, activeVideoId, selectVideo} = useModule();
    const {viewLoaded} = useViewLoaded();

    return <SidebarContent
        className="flex-1 max-h-full overflow-y-auto pb-[5rem] scrollbar-hide"
    >
        {viewLoaded && <SidebarMenu className="space-y-1">
            {videosForModule.map((sectionObject, index) => {
                return <Collapsible open={activeSectionId === sectionObject.section.id}
                                    onOpenChange={v => selectSection(v ? sectionObject.section.id : null)}
                                    key={index}>
                    <CollapsibleTrigger asChild={true}>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="w-full flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <p>{sectionObject.section.order_number}.</p>
                                                <p className="max-w-[10.5rem] truncate">{sectionObject.section.title}</p>
                                            </div>
                                            <IoChevronDown
                                                className={`text-lg text-gray-400 ${activeSectionId === sectionObject.section.id ? "rotate-180" : ""} transition-all duration-200 ease-in-out`}/>
                                        </TooltipTrigger>
                                        {sectionObject.section.title.length > 18 && <TooltipContent>
                                            <p>{sectionObject.section.title}</p>
                                        </TooltipContent>}
                                    </Tooltip>
                                </TooltipProvider>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="space-y-1">
                            {sectionObject.videos.map((video, index) => {
                                return <SidebarMenuSubItem key={index}>
                                    <SidebarMenuButton
                                        onClick={() => selectVideo(video.id)}
                                        className={`${activeVideoId === video.id ? "bg-main-gradient text-white hover:text-white" : ""}`}
                                    >
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2 text-left">
                                                            <p>{video.order_number}.</p>
                                                            <p className="max-w-[9rem] truncate">{video.title}</p>
                                                        </div>
                                                        {finishedVideos.some(v => v.video_id === video.id) && <IoCheckmarkCircle className={`${activeVideoId === video.id ? "text-white" : "text-cta"} text-lg w-[1rem] text-right`} />}
                                                    </div>
                                                </TooltipTrigger>
                                                {video.title.length > 18 && <TooltipContent>
                                                    <p>{video.title}</p>
                                                </TooltipContent>}
                                            </Tooltip>
                                        </TooltipProvider>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            })}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            })}
        </SidebarMenu>}
    </SidebarContent>
}