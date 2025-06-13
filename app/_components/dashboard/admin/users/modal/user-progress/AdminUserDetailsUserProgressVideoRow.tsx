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
    })

    const videoFinished = useMemo(() => {
        if (videoFinishedQuery?.success) return videoFinishedQuery.value;
        // @ts-ignore
    }, [videoFinishedQuery?.value]);

    return <Card className="px-3 py-2 self-start flex items-center justify-between">
        <h4>{video.title}</h4>
        {videoFinished ? <IoCheckmarkCircle className="text-cta text-xl"/> : <IoEllipseOutline className="text-primary/70 text-xl"/>}
    </Card>;
}