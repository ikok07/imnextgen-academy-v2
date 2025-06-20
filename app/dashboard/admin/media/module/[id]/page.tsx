import AdminModuleManageClientWrapper
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManageClientWrapper";
import {getAllModules, getSectionsForModule} from "@/app/dashboard/actions";
import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminModuleManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManagePageHeaderButtons";
import AdminModuleManageDetailsContainer
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManageDetailsContainer";
import {Suspense} from "react";
import AdminModuleManageDetailsPageSkeleton
    from "@/app/_components/dashboard/admin/media/modules/manage-page/skeletons/AdminModuleManageDetailsPageSkeleton";
import AdminModuleManageSectionsTable
    from "@/app/_components/dashboard/admin/media/modules/manage-page/sections-table/AdminModuleManageSectionsTable";

export const revalidate = 0;

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

// TODO: 1. Make module's title and description updatable

export default async function Page(props: z.infer<typeof propsSchema>) {
    return <Suspense fallback={<AdminModuleManageDetailsPageSkeleton />}>
        <InnerContent {...props} />
    </Suspense>
}

async function InnerContent(props: z.infer<typeof propsSchema>) {
    const {data: safeProps, error} = propsSchema.safeParse(props);
    if (error) throw new Error("Invalid page params!");

    const [modulesResult, allSectionsResult] = await Promise.all([getAllModules(), getSectionsForModule(safeProps.params.id)]);

    if (!modulesResult.success || !modulesResult.value.some(m => m.id === safeProps.params.id)) throw new Error("Module result wasn't successful!");

    const allModules = modulesResult.value;
    const module = modulesResult.value.find(m => m.id === safeProps.params.id)!;

    if (!allSectionsResult.success) throw new Error("Could not fetch sections for this module!")

    return <AdminModuleManageClientWrapper module={module}>
        <div className="grid grid-rows-[auto_1fr] w-[95%] h-full max-w-[50rem] mt-4 mx-auto">
            <Card>
                <CardHeader className="py-0 pt-3 grid sm:grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3">
                    <div className="space-y-1 row-start-2 sm:row-start-1">
                        <CardTitle className="text-2xl">Управление на модул</CardTitle>
                        <CardDescription>Панел за управление на избрания модул, също както и неговите секции и видеа</CardDescription>
                    </div>
                    <AdminModuleManagePageHeaderButtons />
                </CardHeader>
                <CardContent>
                    <AdminModuleManageDetailsContainer allModules={allModules} />
                </CardContent>
            </Card>
            <AdminModuleManageSectionsTable moduleId={module.id} allSections={allSectionsResult.value} />
        </div>
    </AdminModuleManageClientWrapper>
}