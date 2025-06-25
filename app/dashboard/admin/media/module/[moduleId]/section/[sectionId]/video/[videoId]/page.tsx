import AdminVideoManageClientWrapper
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageClientWrapper";
import {getModuleById} from "@/app/dashboard/actions";
import {getSectionById} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/action";
import {getVideoById} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/video/[videoId]/actions";
import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminVideoManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePageHeaderButtons";

const propsSchema = z.object({
    params: z.object({
        moduleId: z.string(),
        sectionId: z.string(),
        videoId: z.string()
    }),
});

export default async function Page(props: z.infer<typeof propsSchema>) {

    const {data: safeProps, error} = propsSchema.safeParse(props);
    if (error) throw new Error("Invalid page params!");

    const [modulesResult, sectionResult, videoResult] = await Promise.all([getModuleById(props.params.moduleId), getSectionById(props.params.sectionId), getVideoById(safeProps.params.videoId)]);
    if (!modulesResult.success) throw new Error("Module result wasn't successful!");
    if (!sectionResult.success) throw new Error("Section result wasn't successful!");
    if (!videoResult.success) throw new Error("Video result wasn't successful!");

    const module = modulesResult.value;
    const section = sectionResult.value;
    const video = videoResult.value;

    return <AdminVideoManageClientWrapper module={module} section={section} video={video}>
        <div className="grid grid-rows-[auto_1fr] w-[95%] h-full max-w-[50rem] mt-4 mx-auto">
            <Card>
                <CardHeader className="pb-2 pt-3 border-b border-border grid sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
                    <div className="space-y-1 row-start-2 sm:row-start-1">
                        <CardTitle className="text-2xl">Управление на видео</CardTitle>
                        <CardDescription>Панел за управление на избраното видео</CardDescription>
                    </div>
                    <AdminVideoManagePageHeaderButtons moduleId={props.params.moduleId} sectionId={props.params.sectionId} />
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </div>
    </AdminVideoManageClientWrapper>
}