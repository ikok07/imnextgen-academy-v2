"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useModule} from "@/app/_providers/ModuleProvider";
import DashboardModuleVideoInfo from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoInfo";
import DashboardModuleVideoInfoSkeleton
    from "@/app/_components/dashboard/classroom/module/video/skeletons/DashboardModuleVideoInfoSkeleton";
import {ServerActionResult} from "@/app/_utils/createServerAction";
import {FinishedVideosResponse} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";
import {VideosForModuleResponse} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import MuxVideoPlayer from "@/app/_components/ui/players/MuxVideoPlayer";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getSignedTokens} from "@/app/dashboard/actions";
import {Tokens} from "@mux/mux-player";
import {useMemo, useState} from "react";

type DashboardModuleVideoColumnProps = {
    moduleId: string,
    userId: string,
    videos: VideosForModuleResponse,
    finishedVideosResult: ServerActionResult<FinishedVideosResponse>
}

export default function DashboardModuleVideoColumn({moduleId, userId, videos, finishedVideosResult}: DashboardModuleVideoColumnProps) {
    const {viewLoaded} = useViewLoaded();
    const {activeVideoId} = useModule();
    const [isInvalid, setIsInvalid] = useState(false)

    const activeVideo = videos.flatMap(obj => obj.videos).find(v => v.id === activeVideoId)!;
    const {data: signedTokensQuery, isLoading: isGettingSignedTokens} = useErrorQuery({
        queryFn: () => getSignedTokens(activeVideo!.playbackId ?? undefined, ["video", "thumbnail"]),
        queryKey: [`signed-tokens-${activeVideo?.playbackId}`],
        onError() {
            setIsInvalid(true);
        },
        enabled: !!activeVideo && !!activeVideo.playbackId
    });

    const tokens: Tokens | undefined  = useMemo(() => {
        if (signedTokensQuery?.success) {
            return {
                playback: signedTokensQuery.value.get("video"),
                thumbnail: signedTokensQuery.value.get("thumbnail")
            };
        }
    }, [signedTokensQuery]);

    if (!viewLoaded || !activeVideoId) return <div className="dashboard-module-video-info">
        <DashboardModuleVideoInfoSkeleton />
    </div>

    return <div className="h-full overflow-scroll video-column-width scrollbar-hide pb-5">
        {activeVideo.playbackId
            &&
            <MuxVideoPlayer
                streamType="on-demand"
                playbackId={activeVideo.playbackId}
                isLoading={isGettingSignedTokens}
                hasError={isInvalid}
                tokens={tokens}
                chapters={
                    videos
                        .flatMap(obj => obj.chapters)
                        .filter(c => c.video_id === activeVideoId)
                        .map(c => ({
                            value: c.name,
                            startTime: c.start_seconds,
                            endTime: c.end_seconds ?? undefined
                        }))
                }
            />
        }
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