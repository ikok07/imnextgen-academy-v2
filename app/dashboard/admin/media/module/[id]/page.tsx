import AdminModuleManageClientWrapper
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManageClientWrapper";
import {getAllModules, getModuleById} from "@/app/dashboard/actions";
import {z} from "zod";
import Image from "next/image";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import AdminModuleManagePageHeaderButtons
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManagePageHeaderButtons";
import AdminModulesManagePageProperties
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModulesManagePageProperties";
import AdminModuleManageDetailsContainer
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManageDetailsContainer";

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export default async function Page(props: z.infer<typeof propsSchema>) {
    const {data: safeProps, error} = propsSchema.safeParse(props);
    if (error) throw new Error("Invalid page params!");

    const [modulesResult] = await Promise.all([getAllModules()]);

    if (!modulesResult.success || !modulesResult.value.some(m => m.id === safeProps.params.id)) throw new Error("Module result wasn't successful!");

    const allModules = modulesResult.value;
    const module = modulesResult.value.find(m => m.id === safeProps.params.id)!;

    return <AdminModuleManageClientWrapper module={module}>
        <Card className="w-[95%] max-w-[50rem] mt-4 mx-auto">
            <CardHeader className="py-0 pt-3 grid grid-cols-[1fr_auto] items-start gap-6">
                <div className="space-y-1">
                    <CardTitle className="text-2xl">Управление на модул</CardTitle>
                    <CardDescription>Панел за управление на избрания модул, също както и неговите секции и видеа</CardDescription>
                </div>
                <AdminModuleManagePageHeaderButtons />
            </CardHeader>
            <CardContent>
                <AdminModuleManageDetailsContainer allModules={allModules} />
            </CardContent>
        </Card>
    </AdminModuleManageClientWrapper>
}