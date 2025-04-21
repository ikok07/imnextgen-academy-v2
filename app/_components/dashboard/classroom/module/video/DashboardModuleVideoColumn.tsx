"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useModule} from "@/app/_providers/ModuleProvider";
import {VideosForModuleResponse} from "@/src/application/repositories/media/videos/videos.repository.interface";
import DashboardModuleVideoInfo from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfo";
import DashboardModuleVideoInfoSkeleton
    from "@/app/_components/dashboard/classroom/module/video/skeletons/DashboardModuleVideoInfoSkeleton";
import LoomVideoPlayer from "@/app/_components/ui/players/LoomVideoPlayer";
import {ServerActionResult} from "@/app/_utils/createServerAction";
import {FinishedVideosResponse} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

type DashboardModuleVideoColumnProps = {
    moduleId: string,
    userId: string,
    videos: VideosForModuleResponse,
    finishedVideosResult: ServerActionResult<FinishedVideosResponse>
}

export default function DashboardModuleVideoColumn({moduleId, userId, videos, finishedVideosResult}: DashboardModuleVideoColumnProps) {
    const {viewLoaded} = useViewLoaded();
    const {activeVideoId} = useModule();

    if (!viewLoaded || !activeVideoId) return <div className="dashboard-module-video-info">
        <DashboardModuleVideoInfoSkeleton />
    </div>

    const activeVideo = videos.flatMap(obj => obj.videos).find(v => v.id === activeVideoId)!;

    return <div className="h-full overflow-scroll video-column-width scrollbar-hide pb-5">
        {activeVideo.url && <LoomVideoPlayer videoUrl={activeVideo.url}/>}
        <DashboardModuleVideoInfo
            title={activeVideo.title}
            descriptionMarkdown={videos.flatMap(obj => obj.descriptions).find(d => d.id === activeVideo.description_id)?.markdown ?? ""}
            userId={userId}
            moduleId={moduleId}
            videoId={activeVideo.id}
            finishedVideosResult={finishedVideosResult}
        />
    </div>
}