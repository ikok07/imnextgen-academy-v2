import AdminModuleManageClientWrapper
    from "@/app/_components/dashboard/admin/media/modules/manage-page/AdminModuleManageClientWrapper";
import {getModuleById} from "@/app/dashboard/actions";
import {z} from "zod";

const propsSchema = z.object({
    params: z.object({
        id: z.string()
    })
})

export default async function Page(props: z.infer<typeof propsSchema>) {
    const {data: safeProps, error} = propsSchema.safeParse(props);
    if (error) throw new Error("Invalid page params!");

    const [moduleResult] = await Promise.all([await getModuleById(safeProps.params.id)]);

    if (!moduleResult.success) throw new Error("Module result wasn't successful!");

    return <AdminModuleManageClientWrapper module={moduleResult.value}>
        {safeProps.params.id}
    </AdminModuleManageClientWrapper>
}