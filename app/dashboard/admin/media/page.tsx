import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import AdminModulesTable from "@/app/_components/dashboard/admin/media/modules/AdminModulesTable";
import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";

export default function Page() {
    return <SetActiveLinkComponent linkId="media">
        <div className="grid grid-rows-[auto_1fr] w-[95%] max-w-max h-[90vh] mx-auto">
            <AdminTableHeading>Модули</AdminTableHeading>
            <AdminModulesTable />
        </div>
    </SetActiveLinkComponent>
}