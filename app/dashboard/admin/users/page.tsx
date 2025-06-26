import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import AdminUsersTable from "@/app/_components/dashboard/admin/users/AdminUsersTable";
import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";

export default async function Page() {
    return <SetActiveLinkComponent linkId="allUsers">
        <div className="grid grid-rows-[auto_1fr] w-[95%] max-w-max h-[90vh] mx-auto">
            <AdminTableHeading>Потребители</AdminTableHeading>
            <AdminUsersTable />
        </div>
    </SetActiveLinkComponent>
}