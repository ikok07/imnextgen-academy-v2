import AdminVideoManageClientWrapper
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageClientWrapper";
import {getModuleById, getVideosForSection} from "@/app/dashboard/actions";
import {getSectionById} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/action";
import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminVideoManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePageHeaderButtons";
import AdminVideoManageDetailsContainer
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageDetailsContainer";

export const revalidate = 0;

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

    const [modulesResult, sectionResult, videosResult] = await Promise.all([getModuleById(props.params.moduleId), getSectionById(props.params.sectionId), getVideosForSection(safeProps.params.sectionId)]);
    if (!modulesResult.success) throw new Error("Module result wasn't successful!");
    if (!sectionResult.success) throw new Error("Section result wasn't successful!");
    if (!videosResult.success) throw new Error("Videos result wasn't successful!");

    const module = modulesResult.value;
    const section = sectionResult.value;

    const allVideos = videosResult.value;
    const video = allVideos.find(v => v.id === safeProps.params.videoId);

    if (!video) throw new Error("Video not found!");

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
                    <AdminVideoManageDetailsContainer allVideos={allVideos}/>
                </CardContent>
            </Card>
        </div>
    </AdminVideoManageClientWrapper>
}