"use client"

import {useMemo} from "react";
import {Video} from "@/drizzle/schema/videos";
import {IoCheckmarkCircle, IoEllipseOutline} from "react-icons/io5";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {Card} from "@/app/_components/ui/shadcn/card";
import {useUserProgress} from "@/app/_providers/admin/UserProgressProvider";

type AdminUserDetailsUserProgressVideoRowProps = {
    video: Video,
    userId: string,
}

export default function AdminUserDetailsUserProgressVideoRow({video, userId}: AdminUserDetailsUserProgressVideoRowProps) {
    const {finishedVideosForAllSectionInModule, videoProgressesForSection} = useUserProgress();

    const videoFinished: boolean = useMemo(() => {
        return !!finishedVideosForAllSectionInModule?.sections.flatMap(s => s.finishedVideos).find(finishedVideo => finishedVideo.video_id === video.id);
    }, []);

    const videoProgress = useMemo(() => {
        if (videoFinished) return 100;
        return videoProgressesForSection?.find(p => p.video.id === video.id)?.progress ?? 0;
    }, [videoProgressesForSection, videoFinished]);

    return <Card className="px-3 py-2 self-start grid">
        <div className="grid grid-cols-[1fr_auto] items-center mb-1">
            <h4 className="line-clamp-1">{video.title}</h4>
            {videoFinished ? <IoCheckmarkCircle className="text-cta text-xl"/> : <IoEllipseOutline className="text-primary/70 text-xl"/>}
        </div>
        <div className="flex items-center gap-3">
            <Progress value={videoProgress ?? 0} sliderClassName={"bg-cta dark:bg-white"} className="flex-1"/>
            <h5 className="font-black text-cta text-sm">{videoProgress ? isNaN(videoProgress) ? "-" : `${videoProgress}%` : "0%"}</h5>
        </div>
    </Card>;
}