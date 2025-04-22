import {getFinishedVideos, getModuleById, getVideosForModule} from "@/app/dashboard/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import { Routes } from "@/app/_utils/nav/routes";
import DashboardModuleClientWrapper from "@/app/_components/dashboard/classroom/module/DashboardModuleClientWrapper";
import {z} from "zod";
import {redirect} from "next/navigation";
import DashboardModuleSectionsSidebar
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSectionsSidebar";
import {Suspense} from "react";
import DashboardModuleSidebarSkeleton
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSidebarSkeleton";
import {getInjection} from "@/di/container";
import DashboardModuleVideoColumn from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoColumn";
import DashboardModuleVideoInfoSkeleton
    from "@/app/_components/dashboard/classroom/module/video/skeletons/DashboardModuleVideoInfoSkeleton";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export default function Page(props: z.infer<typeof propsSchema>) {
    return <Suspense
        fallback={
            <div className="dashboard-module-grid video-column-width">
                <DashboardModuleSidebarSkeleton />
                <div className="h-full overflow-scroll">
                    <Skeleton className="max-w-[50rem] w-full mx-auto aspect-video" />
                    <div className="dashboard-module-video-info">
                        <DashboardModuleVideoInfoSkeleton />
                    </div>
                </div>
            </div>
        }
    >
        <InnerContent {...props} />
    </Suspense>
}

export async function InnerContent(props: z.infer<typeof propsSchema>) {
    try {
        const {data: safeProps, error} = propsSchema.safeParse(props);
        if (error) redirect(Routes.dashboard.base);

        const {user} = await getInjection("IGetUserController")();
        if (!user) throw new Error("User was not found!");

        const modulePromise = getModuleById(safeProps.params.id);
        const videosPromise = getVideosForModule(safeProps.params.id);
        const finishedVideosPromise = getFinishedVideos(safeProps.params.id, user!.id);

        const [moduleResult, videosResult, finishedVideosResult] = await Promise.all([modulePromise, videosPromise, finishedVideosPromise]);

        if (!moduleResult.success) throw new Error("Module result wasn't successful!");
        if (!videosResult.success) throw new Error("Videos for module could not be loaded!");

        return <DashboardModuleClientWrapper
            module={moduleResult.value}
            videosForModule={videosResult.value}
            finishedVideos={finishedVideosResult?.success ? finishedVideosResult.value.finishedVideos : []}
        >
            <div className="dashboard-module-grid video-column-width">
                <DashboardModuleSectionsSidebar
                    userId={user.id}
                    moduleId={moduleResult.value.id}
                    moduleTitle={moduleResult.value.title}
                    videosForModule={videosResult.value}
                    finishedVideosResult={finishedVideosResult}
                />
                <DashboardModuleVideoColumn
                    moduleId={moduleResult.value.id}
                    userId={user.id}
                    videos={videosResult.value}
                    finishedVideosResult={finishedVideosResult}
                />
            </div>
        </DashboardModuleClientWrapper>

    } catch(e) {
        console.error(e);
        return <div className="h-full grid place-content-center">
            <PrimaryErrorMessage
                Icon={IoCloudOffline}
                title="Възникна грешка"
                message="Модулът не беше зареден. Моля, опитай отново!"
                className="col-span-full max-w-[20rem] mx-auto"
                backURI={Routes.dashboard.base}
            />
        </div>
    }
}