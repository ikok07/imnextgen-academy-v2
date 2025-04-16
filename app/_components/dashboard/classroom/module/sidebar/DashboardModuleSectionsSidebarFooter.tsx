"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {SidebarFooter} from "@/app/_components/ui/shadcn/sidebar";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFinishedVideos} from "@/app/dashboard/actions";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";

type DashboardModuleSectionsSidebarFooterProps = {
    moduleId: string
}

export default function DashboardModuleSectionsSidebarFooter({moduleId}: DashboardModuleSectionsSidebarFooterProps) {
    const {userObject} = useAppUser();
    const {viewLoaded} = useViewLoaded()

    const {data: finishedVideosQuery, isLoading, isFetching} = useErrorQuery({
        queryFn: () => getFinishedVideos(moduleId, userObject.user!.id),
        queryKey: [`finishedVideos-${moduleId}`],
        enabled: !!userObject.user
    })

    const showLoading = isLoading || isFetching || !viewLoaded;
    const progress = finishedVideosQuery?.success ? finishedVideosQuery.value.percentage : 0;

    return <SidebarFooter className="relative p-0">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="cursor-help">
                    <div className="space-y-1 hover:bg-secondary px-2 py-1 rounded-md transition-all duration-200">
                        <div className="flex items-center justify-between text-[0.9rem]">
                            {showLoading ? <Skeleton className="w-[4.5rem] h-[0.9rem]" /> : <label>Прогрес:</label>}
                            {showLoading ? <Skeleton className="w-[2rem] h-[0.9rem]" /> : <span>{progress}%</span>}
                        </div>
                        {showLoading ?
                            <Skeleton className="w-full h-[0.5rem]"/>
                            :
                            <Progress
                                value={progress}
                                className=""
                                sliderClassName="bg-main-gradient"
                            />
                        }
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Процентът се обновява след края на всяко видео или при ръчно отбелязване</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div className="absolute w-full h-[5rem] bottom-[100%] bg-gradient-to-t from-background to-transparent"/>
    </SidebarFooter>
}