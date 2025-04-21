"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {SidebarFooter} from "@/app/_components/ui/shadcn/sidebar/sidebar";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";

type DashboardModuleSectionsSidebarFooterProps = {
    progress: number
}

export default function DashboardModuleSectionsSidebarFooter({progress}: DashboardModuleSectionsSidebarFooterProps) {
    const {viewLoaded} = useViewLoaded()

    if (!viewLoaded) return;

    return <SidebarFooter className="relative px-0 py-3">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="cursor-help">
                    <div className="space-y-1 hover:bg-secondary px-2 py-1 rounded-md transition-all duration-200">
                        <div className="flex items-center justify-between text-[0.9rem]">
                            <label>Прогрес:</label>
                            <span>{progress}%</span>
                        </div>
                        <Progress
                            value={progress}
                            className=""
                            sliderClassName="bg-main-gradient"
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Процентът се обновява при отбелязване на видео като изгледано</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div className="absolute w-full h-[5rem] bottom-[100%] bg-gradient-to-t from-background to-transparent"/>
    </SidebarFooter>
}