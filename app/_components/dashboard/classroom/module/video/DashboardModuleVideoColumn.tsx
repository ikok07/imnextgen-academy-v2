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
import LoomVideoPlayer from "@/app/_components/ui/players/LoomVideoPlayer";

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
        {/*{activeVideo.url && <LoomVideoPlayer videoUrl={activeVideo.url}/>}*/}
        {activeVideo.url
            &&
            <MuxVideoPlayer
                streamType="on-demand"
                playbackId="LDHI7gmM8cACJKKbg01PEWZ9kHrlnP3PN502LoThiTZe4"
                tokens={{
                    playback: "eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJBU1RQeW56TDFOaWU2VG1OeVN5NG1iM0dzRHRzanRkNUpwQkUwMVBnSHlkWSIsInN1YiI6IkxESEk3Z21NOGNBQ0pLS2JnMDFQRVdaOWtIcmxuUDNQTjUwMkxvVGhpVFplNCIsImF1ZCI6InYiLCJleHAiOjE3NDc1OTgxMjN9.Dypxkio46KWyKfUjk3GkxD9-I8hQksvBqcrZINlBZ5iBOD0gqxCP6dzc8oF-LI5VQqxIfCcMwCyU3Do9AL78i9S4PRymEbic4xY_GrwEsx1hGIVPS27iAzegeWqNivdSmldAP_F8hADzP5_C5hQUEhU-d2BNV1vQvT6-D0V3nBji1_Wmvz9Hr9X0LT5hKkGd6JGL3TFKAjyEKRHBgDRyo1ZrEAijhn44ZC7jWrMMlJazSDzkOUYLye8JskfygcWKKbkEERdWGb0pV_gzZqkYYKu6LO40XRksjtpfedkhbh52dbMslIO0p2lam6EtS5RuNbRCdIEluy2KX2xFefearQ",
                    thumbnail: "eyJhbGciOiJSUzI1NiJ9.eyJraWQiOiJBU1RQeW56TDFOaWU2VG1OeVN5NG1iM0dzRHRzanRkNUpwQkUwMVBnSHlkWSIsInN1YiI6IkxESEk3Z21NOGNBQ0pLS2JnMDFQRVdaOWtIcmxuUDNQTjUwMkxvVGhpVFplNCIsImF1ZCI6InQiLCJleHAiOjE3NDc1OTgxMjN9.iikLBdGOSl0TImJhzTJd7WjYMS-ln2KJRcXYuYi00gSXcA76T27XJUScsknuq6VSqvdoeHW4nbTSXRtJvMzL2IoImqde6wrFOdA_q5RdQGNpDQsOA5cqmXPDekDVQAHUBNl9HKDS8b3Vsx8MmrwHeTBAkAwl7acQxeSoa-G0ZXFHxo8qvyCSMEYazYUBHvjIwPR4w83Cvd-1l4hJHEBSzRsIRg5jk94-GAqcEcMkBI2-TcwOYKBYLeJGlIXZHhaxchjl73n7HmeEL3cbt4f-mBDv7S0on2YfZKAs9ugMod_c0koWIZ5wJ8DdQ6EepMjcOnY38Mb51XVtFNMNxa7RTA",
                }}
                chapters={[{
                    startTime: 1,
                    endTime: 3,
                    value: "Chapter 1"
                }]}
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