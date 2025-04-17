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

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export default function Page(props: z.infer<typeof propsSchema>) {
    return <Suspense
        fallback={
            <div className="grid grid-cols-[16rem_1fr]">
                <DashboardModuleSidebarSkeleton />
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
        if (!finishedVideosResult.success) throw new Error("Finished videos for module could not be loaded!");

        return <DashboardModuleClientWrapper module={moduleResult.value}>
            <div className="grid grid-cols-[16rem_1fr]">
                <DashboardModuleSectionsSidebar
                    moduleId={moduleResult.value.id}
                    moduleTitle={moduleResult.value.title}
                    videosForModule={videosResult.value}
                    finishedVideos={finishedVideosResult.value}
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