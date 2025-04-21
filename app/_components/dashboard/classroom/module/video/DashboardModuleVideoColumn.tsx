"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useModule} from "@/app/_providers/ModuleProvider";
import {VideosForModuleResponse} from "@/src/application/repositories/media/videos/videos.repository.interface";
import DashboardModuleVideoInfo from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfo";
import DashboardModuleVideoInfoSkeleton
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfoSkeleton";
import SelfHostedVideoPlayer from "@/app/_components/ui/players/SelfHostedVideoPlayer";
import VimeoVideoPlayer from "@/app/_components/ui/players/VimeoVideoPlayer";
import LoomVideoPlayer from "@/app/_components/ui/players/LoomVideoPlayer";

type DashboardModuleVideoColumnProps = {
    videos: VideosForModuleResponse,
}

export default function DashboardModuleVideoColumn({videos}: DashboardModuleVideoColumnProps) {
    const {viewLoaded} = useViewLoaded();
    const {activeVideoId} = useModule();

    if (!viewLoaded || !activeVideoId) return <div className="dashboard-module-video-info">
        <DashboardModuleVideoInfoSkeleton />
    </div>

    const activeVideo = videos.flatMap(obj => obj.videos).find(v => v.id === activeVideoId)!;

    return <div className="h-full overflow-scroll video-column-width scrollbar-hide pb-5">
        {activeVideo.url && <LoomVideoPlayer videoUrl={activeVideo.url}/>}
        {/*<SelfHostedVideoPlayer*/}
        {/*    url="/api/v1/videos?path=test-video.mp4"*/}
        {/*/>*/}
        {/*<VimeoVideoPlayer videoUrl="https://player.vimeo.com/video/947857591?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"/>*/}
        <DashboardModuleVideoInfo
            title={activeVideo.title}
            descriptionMarkdown={videos.flatMap(obj => obj.descriptions).find(d => d.id === activeVideo.description_id)?.markdown ?? ""}
        />
    </div>
}