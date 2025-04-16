import {getModuleById, getVideosForModule} from "@/app/dashboard/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import { Routes } from "@/app/_utils/nav/routes";
import DashboardModuleClientWrapper from "@/app/_components/dashboard/classroom/module/DashboardModuleClientWrapper";
import {z} from "zod";
import {redirect} from "next/navigation";
import DashboardModuleSectionsSidebar
    from "@/app/_components/dashboard/classroom/module/sidebar/DashboardModuleSectionsSidebar";

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export default async function Page(props: z.infer<typeof propsSchema>) {
    try {
        const {data: safeProps, error} = propsSchema.safeParse(props);
        if (error) redirect(Routes.dashboard.base);

        const modulePromise = getModuleById(safeProps.params.id);
        const videosPromise = getVideosForModule(safeProps.params.id);
        const [moduleResult, videosResult] = await Promise.all([modulePromise, videosPromise]);

        if (!moduleResult.success) throw new Error("Module result wasn't successful!");
        if (!videosResult.success) throw new Error("Videos for module could not be loaded");

        return <DashboardModuleClientWrapper module={moduleResult.value}>
            <div className="grid grid-cols-[16rem_1fr]">
                <DashboardModuleSectionsSidebar
                    moduleId={moduleResult.value.id}
                    moduleTitle={moduleResult.value.title}
                    videosForModule={videosResult.value}
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