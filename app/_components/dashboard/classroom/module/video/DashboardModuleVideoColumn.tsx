"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useModule} from "@/app/_providers/ModuleProvider";
import {VideosForModuleResponse} from "@/src/application/repositories/media/videos/videos.repository.interface";
import Markdown from "markdown-to-jsx";
import {ComponentProps} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import DashboardModuleVideoInfo from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfo";
import DashboardModuleVideoInfoSkeleton
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfoSkeleton";

type DashboardModuleVideoColumnProps = {
    videos: VideosForModuleResponse
}

export default function DashboardModuleVideoColumn({videos}: DashboardModuleVideoColumnProps) {
    const {viewLoaded} = useViewLoaded();
    const {activeVideoId} = useModule();

    if (!viewLoaded || !activeVideoId) return <div className="dashboard-module-video-info">
        <DashboardModuleVideoInfoSkeleton />
    </div>

    const activeVideo = videos.flatMap(obj => obj.videos).find(v => v.id === activeVideoId)!;

    return <div className="">
        <DashboardModuleVideoInfo
            title={activeVideo.title}
            descriptionMarkdown={videos.flatMap(obj => obj.descriptions).find(d => d.id === activeVideo.description_id)?.markdown ?? ""}
        />
    </div>
}