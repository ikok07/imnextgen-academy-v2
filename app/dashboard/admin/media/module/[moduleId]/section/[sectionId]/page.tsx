import {z} from "zod";
import AdminSectionsManageClientWrapper
    from "@/app/_components/dashboard/admin/media/sections/AdminSectionsManageClientWrapper";
import {getModuleById, getSectionsForModule, getVideosForModule, getVideosForSection} from "@/app/dashboard/actions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminSectionManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/sections/AdminSectionManagePageHeaderButtons";
import AdminSectionManageDetailsContainer
    from "@/app/_components/dashboard/admin/media/sections/AdminSectionManageDetailsContainer";
import AdminSectionManageVideosTable
    from "@/app/_components/dashboard/admin/media/sections/videos-table/AdminSectionManageVideosTable";

export const revalidate = 0;

const propsSchema = z.object({
    params: z.object({
        moduleId: z.string(),
        sectionId: z.string()
    }),
});

export default async function Page(props: z.infer<typeof propsSchema>) {
    const {data: safeProps, error} = propsSchema.safeParse(props);
    if (error) throw new Error("Invalid page params!");

    const [modulesResult, sectionsResult, allVideosForModuleResult] = await Promise.all([getModuleById(props.params.moduleId), getSectionsForModule(props.params.moduleId), getVideosForModule(safeProps.params.moduleId)]);
    if (!modulesResult.success) throw new Error("Module result wasn't successful!");
    if (!sectionsResult.success || !sectionsResult.value.some(s => s.id === safeProps.params.sectionId)) throw new Error("Section result wasn't successful!");
    if (!allVideosForModuleResult.success) throw new Error("All videos for module result wasn't successful!");

    const allSections = sectionsResult.value;
    const module = modulesResult.value;
    const section = sectionsResult.value.find(s => s.id === safeProps.params.sectionId)!;
    const allVideosForModule = allVideosForModuleResult.value;
    const allVideos = allVideosForModule.filter(obj => obj.section.id === safeProps.params.sectionId).flatMap(obj => obj.videos);

    return <AdminSectionsManageClientWrapper module={module} section={section} allSections={allSections} allVideosForModule={allVideosForModule}>
        <div className="grid grid-rows-[auto_1fr] w-[95%] h-full max-w-[50rem] mt-4 mx-auto">
            <Card>
                <CardHeader className="pb-2 pt-3 border-b border-border grid sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
                    <div className="space-y-1 row-start-2 sm:row-start-1">
                        <CardTitle className="text-2xl">Управление на секция</CardTitle>
                        <CardDescription>Панел за управление на избраната секция, също както и нейните видеа</CardDescription>
                    </div>
                    <AdminSectionManagePageHeaderButtons moduleId={safeProps.params.moduleId} sectionId={safeProps.params.sectionId} />
                </CardHeader>
                <CardContent>
                    <AdminSectionManageDetailsContainer allSections={allSections} />
                </CardContent>
            </Card>
            <AdminSectionManageVideosTable moduleId={safeProps.params.moduleId} sectionId={safeProps.params.sectionId} />
        </div>
    </AdminSectionsManageClientWrapper>
}