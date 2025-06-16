"use client"

import {Dispatch, SetStateAction, useMemo} from "react";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {checkFinishedVideo, getFinishedVideosForSection} from "@/app/dashboard/actions";
import AdminUserDetailsProgressContainer
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsProgressContainer";
import {Video} from "@/drizzle/schema/videos";
import {toast} from "sonner";
import {IoCheckmarkCircle, IoEllipseOutline} from "react-icons/io5";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {Card} from "@/app/_components/ui/shadcn/card";
import {getVideoProgressByVideoId} from "@/app/dashboard/admin/actions";

type AdminUserDetailsUserProgressVideoRowProps = {
    video: Video,
    userId: string,
}

export default function AdminUserDetailsUserProgressVideoRow({video, userId}: AdminUserDetailsUserProgressVideoRowProps) {
    const {data: videoFinishedQuery, isLoading: isCheckingVideoFinished} = useErrorQuery({
        queryFn: () => checkFinishedVideo(video.id, userId),
        queryKey: ["video-finished", userId, video.id],
        onError() {
            toast.error("Видеото не може да бъде проверено дали е завършено!");
        }
    });

    const {data: videoProgressQuery, isLoading: isLoadingVideoProgress} = useErrorQuery({
        queryFn: () => getVideoProgressByVideoId(userId, video.id),
        queryKey: ["video-progress", userId, video.id],
        onError() {
            toast.error("Прогресът на видеото не може да бъде зареден!");
        }
    });

    const videoFinished = useMemo(() => {
        if (videoFinishedQuery?.success) return videoFinishedQuery.value;
        // @ts-ignore
    }, [videoFinishedQuery?.value]);

    const videoProgress = useMemo(() => {
        if (videoFinished) return 100;
        if (videoProgressQuery?.success) return videoProgressQuery.value?.progress;
        // @ts-ignore
    }, [videoProgressQuery?.value, videoFinished]);

    return <Card className="px-3 py-2 self-start grid">
        <div className="grid grid-cols-[1fr_auto] items-center mb-1">
            <h4 className="line-clamp-1">{video.title}</h4>
            {videoFinished ? <IoCheckmarkCircle className="text-cta text-xl"/> : <IoEllipseOutline className="text-primary/70 text-xl"/>}
        </div>
        <div className="flex items-center gap-3">
            <Progress value={videoProgress ?? 0} sliderClassName={"bg-cta dark:bg-white"} className="flex-1"/>
            <h5 className="font-black text-cta text-sm">{videoProgress ?? 0}%</h5>
        </div>
    </Card>;
}