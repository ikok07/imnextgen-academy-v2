import {getModuleById, getSectionsForModule, getVideosForSection} from "@/app/dashboard/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import { Routes } from "@/app/_utils/nav/routes";
import DashboardModuleClientWrapper from "@/app/_components/dashboard/classroom/module/DashboardModuleClientWrapper";
import {z} from "zod";
import {redirect} from "next/navigation";

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
        // const sectionsPromise = getSectionsForModule("6c9d5807-fc77-483e-a0da-b67aa151626e");
        // const videosPromise = getVideosForSection("b0ab7cfc-ff3f-4939-ab86-6ee10085dc4b");
        const [moduleResult] = await Promise.all([modulePromise]);

        if (!moduleResult.success) throw new Error("Module result wasn't successful!");

        return <DashboardModuleClientWrapper module={moduleResult.value}>
            <h1>Test</h1>
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