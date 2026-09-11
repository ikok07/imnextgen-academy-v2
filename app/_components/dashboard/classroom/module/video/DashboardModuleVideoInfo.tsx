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
import {VideoResource} from "@/drizzle/schema/video_resources";
import DashboardModuleVideoResources
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoResources";
import LessonInteractivityProvider
    from "@/app/_components/dashboard/classroom/module/video/interactive/LessonInteractivityProvider";
import LessonProgressBar
    from "@/app/_components/dashboard/classroom/module/video/interactive/LessonProgressBar";
import {IoDocumentTextOutline} from "react-icons/io5";

type DashboardModuleVideoInfoProps = {
    title: string
    descriptionMarkdown: string,
    videoId: string,
    moduleId: string,
    userId: string,
    resources: VideoResource[],
    isArticle?: boolean,
    finishedVideosResult: ServerActionResult<FinishedVideosResponse>,
    isAddingFinishedVideo: boolean,
    onAddFinishVideo: () => void
}

/**
 * Груба оценка за време за четене - само за уроци-статии.
 * Текстът се чете бързо, кодът и задачите - бавно, затова се броят отделно.
 */
function readingMinutes(markdown: string) {
    const blocks = markdown.match(/```[\s\S]*?```/g) ?? [];
    const blockLines = blocks.reduce((sum, block) => sum + block.split("\n").length, 0);
    const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;

    return Math.max(2, Math.round(words / 180 + blockLines / 14));
}

export default function DashboardModuleVideoInfo({videoId, moduleId, title, descriptionMarkdown, userId, resources, isArticle, finishedVideosResult, isAddingFinishedVideo, onAddFinishVideo}: DashboardModuleVideoInfoProps) {
    const queryClient = useQueryClient();
    const {data: finishedVideosQuery, isLoading: isLoadingFinishedVideos} = useErrorQuery({
        queryFn: () => getFinishedVideos(moduleId, userId),
        queryKey: ["finished-assets"],
        initialData: finishedVideosResult
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
                <CardDescription className="flex items-center gap-1.5">
                    {isArticle
                        ? <><IoDocumentTextOutline /> Статия · около {readingMinutes(descriptionMarkdown)} мин четене</>
                        : "Допълнителна информация"}
                </CardDescription>
            </div>
            {isLoadingFinishedVideos ?
                <DashboardModuleVideoFinishedVideoButtonSkeleton />
                :
                <SecondaryButton
                    className={`${videoFinished ? "bg-main-gradient border-none text-white dark:text-white hover:from-purple-600 hover:to-cta dark:hover:from-purple-500 dark:hover:to-cta" : ""} flex-1`}
                    onClick={() => videoFinished ? removeFinishedVideoMethod() : onAddFinishVideo()}
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
        <CardContent className="space-y-4">
            <DashboardModuleVideoResources resources={resources} />
            <LessonInteractivityProvider
                lessonId={videoId}
                alreadyFinished={videoFinished}
                onAllCheckpointsDone={onAddFinishVideo}
            >
                <LessonProgressBar />
                <DashboardModuleVideoDescription description={descriptionMarkdown}/>
            </LessonInteractivityProvider>
        </CardContent>
    </Card>
}