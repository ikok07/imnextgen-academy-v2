"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import DashboardModuleVideoDescription
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoDescription";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {IoCheckmarkCircle} from "react-icons/io5";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {addFinishedVideo, getFinishedVideos, removeFinishedVideo} from "@/app/dashboard/actions";
import {toast} from "sonner";
import DashboardModuleVideoFinishedVideoButtonSkeleton
    from "@/app/_components/dashboard/classroom/module/video/skeletons/DashboardModuleVideoFinishedVideoButtonSkeleton";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {useQueryClient} from "react-query";
import {ServerActionResult} from "@/app/_utils/createServerAction";
import {FinishedVideosResponse} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";

type DashboardModuleVideoInfoProps = {
    title: string
    descriptionMarkdown: string,
    videoId: string,
    moduleId: string,
    userId: string,
    finishedVideosResult: ServerActionResult<FinishedVideosResponse>
}

export default function DashboardModuleVideoInfo({videoId, moduleId, title, descriptionMarkdown, userId, finishedVideosResult}: DashboardModuleVideoInfoProps) {
    const queryClient = useQueryClient();
    const {data: finishedVideosQuery, isLoading: isLoadingFinishedVideos} = useErrorQuery({
        queryFn: () => getFinishedVideos(moduleId, userId),
        queryKey: ["finished-assets"],
        initialData: finishedVideosResult
    });

    const {mutate: addFinishedVideoMethod, isLoading: isAddingFinishedVideo} = useErrorMutation({
        mutationFn: () => addFinishedVideo(videoId, userId),
        onSuccess() {
            queryClient.invalidateQueries(["finished-assets"]);
        },
        onError() {
            toast.error("Видеото не беше отбелязано като изгледано успешно!");
        }
    });

    const {mutate: removeFinishedVideoMethod, isLoading: isRemovingFinishedVideo} = useErrorMutation({
        mutationFn: () => removeFinishedVideo(videoId, userId),
        onSuccess() {
            queryClient.invalidateQueries(["finished-assets"]);
        },
        onError() {
            toast.error("Видеото не беше премахнато от изгледани успешно!");
        }
    });

    const videoFinished = !!finishedVideosQuery?.success && finishedVideosQuery.value.finishedVideos.some(v => v.video_id === videoId);

    return <Card className="rounded-sm mt-3 dashboard-module-video-info markdown">
        <CardHeader className="grid xl:grid-cols-[1fr_auto] lg:items-center gap-3">
            <div>
                <CardTitle className="text-2xl">
                    {title}
                </CardTitle>
                <CardDescription>
                    Допълнителна информация
                </CardDescription>
            </div>
            {isLoadingFinishedVideos ?
                <DashboardModuleVideoFinishedVideoButtonSkeleton />
                :
                <SecondaryButton
                    className={`${videoFinished ? "bg-main-gradient border-none text-white dark:text-white hover:from-purple-600 hover:to-cta dark:hover:from-purple-500 dark:hover:to-cta" : ""} flex-1`}
                    onClick={() => videoFinished ? removeFinishedVideoMethod() : addFinishedVideoMethod()}
                    loading={isAddingFinishedVideo || isRemovingFinishedVideo}
                >
                    {videoFinished ?
                        <div className="flex items-center gap-2">
                            <IoCheckmarkCircle />
                            Завършен ресурс
                        </div>
                        :
                        "Отбелязване като завършен"
                    }
                </SecondaryButton>
            }
        </CardHeader>
        <CardContent>
            <DashboardModuleVideoDescription description={descriptionMarkdown}/>
        </CardContent>
    </Card>
}