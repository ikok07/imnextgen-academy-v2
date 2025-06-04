import {getFinishedVideos, getModuleById, getVideosForModule} from "@/app/dashboard/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import { Routes } from "@/app/_utils/nav/routes";
import DashboardModuleClientWrapper from "@/app/_components/dashboard/classroom/module/DashboardModuleClientWrapper";
import {z} from "zod";
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
import {serverCheckModuleAllowed,} from "@/app/_utils/modules/serverCheckModulesAllowed";
import {getUserBoughtModules, getUserSubscription} from "@/app/actions";
import RedirectComponent from "@/app/_components/ui/RedirectComponent";
import DashboardModuleNoVideos from "@/app/_components/dashboard/classroom/module/DashboardModuleNoVideos";

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

async function InnerContent(props: z.infer<typeof propsSchema>) {
    try {
        const {data: safeProps, error} = propsSchema.safeParse(props);
        if (error) throw new Error("Invalid page params!");

        const {user, dbProfile} = await getInjection("IGetUserController")();
        if (!user || !dbProfile) throw new Error("User or profile was not found!");

        const [moduleResult, videosResult, finishedVideosResult, subscriptionResponse, boughtModulesResponse] = await Promise.all([
            getModuleById(safeProps.params.id),
            getVideosForModule(safeProps.params.id),
            getFinishedVideos(safeProps.params.id, user!.id),
            getUserSubscription(user.id),
            getUserBoughtModules(user.id)
        ]);

        if (!moduleResult.success) throw new Error("Module result wasn't successful!");
        if (!videosResult.success) throw new Error("Videos for module could not be loaded!");
        if (!subscriptionResponse.success) throw new Error("Get subscription server action was not successful!");
        if (!boughtModulesResponse.success) throw new Error("Get bought modules server action was not successful!");

        const accessResponse = await serverCheckModuleAllowed({
            userId: user.id,
            roles: dbProfile?.roles ?? [],
            subscription_tier: subscriptionResponse.value?.tier,
            paid_modules: boughtModulesResponse.value.map(v => v.module.id),
            moduleId: moduleResult.value.id,
            moduleAccess: moduleResult.value.access,
        });

        if (!accessResponse.success) throw new Error("Check multiple resources server action was not successful!");

        if (!accessResponse.value) return <RedirectComponent path={Routes.dashboard.classroom.base} />

        return <DashboardModuleClientWrapper
            module={moduleResult.value}
            videosForModule={videosResult.value}
            finishedVideos={finishedVideosResult?.success ? finishedVideosResult.value.finishedVideos : []}
        >
            {videosResult.value.length === 0 ?
                <DashboardModuleNoVideos />
                :
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
            }
        </DashboardModuleClientWrapper>

    } catch(e) {
        console.error(e);
        return <div className="h-full grid place-content-center">
            <PrimaryErrorMessage
                Icon={IoCloudOffline}
                title="Възникна грешка"
                message="Модулът не беше зареден. Моля, опитай отново!"
                className="col-span-full max-w-[20rem] mx-auto"
                backURI={Routes.dashboard.classroom.base}
            />
        </div>
    }
}