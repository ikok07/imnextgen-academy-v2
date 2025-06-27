import AdminVideoManageClientWrapper
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageClientWrapper";
import {getModuleById, getSectionsForModule, getVideosForModule, getVideosForSection} from "@/app/dashboard/actions";
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

    const [modulesResult, sectionResult, videosResult] = await Promise.all([getModuleById(props.params.moduleId), getSectionsForModule(props.params.moduleId), getVideosForModule(safeProps.params.moduleId)]);
    if (!modulesResult.success) throw new Error("Module result wasn't successful!");
    if (!sectionResult.success) throw new Error("Section result wasn't successful!");
    if (!videosResult.success) throw new Error("Videos result wasn't successful!");

    const module = modulesResult.value;
    const sectionsForModule = sectionResult.value;
    const videosForModule = videosResult.value;

    const section = sectionsForModule.find(s => s.id === safeProps.params.sectionId);
    if (!section) throw new Error("Section not found!");

    const video = videosForModule.filter(obj => obj.section.id === safeProps.params.sectionId).flatMap(obj => obj.videos).find(v => v.id === safeProps.params.videoId);
    if (!video) throw new Error("Video not found!");

    return <AdminVideoManageClientWrapper module={module} section={section} video={video} videosForModule={videosForModule}>
        <div className="grid grid-rows-[auto_1fr] w-[95%] h-full max-w-[50rem] mt-4 mx-auto">
            <Card>
                <CardHeader className="pb-2 pt-3 border-b border-border grid sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
                    <div className="space-y-1 row-start-2 sm:row-start-1">
                        <CardTitle className="text-2xl">Управление на видео</CardTitle>
                        <CardDescription>Панел за управление на избраното видео</CardDescription>
                    </div>
                    <AdminVideoManagePageHeaderButtons moduleId={safeProps.params.moduleId} sectionId={props.params.sectionId} />
                </CardHeader>
                <CardContent>
                    <AdminVideoManageDetailsContainer sectionId={safeProps.params.sectionId} sectionsForModule={sectionsForModule} />
                </CardContent>
            </Card>
        </div>
    </AdminVideoManageClientWrapper>
}