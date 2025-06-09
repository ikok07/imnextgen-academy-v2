import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import AdminUsersTable from "@/app/_components/dashboard/admin/users/AdminUsersTable";

export default async function Page() {
    return <div className="grid grid-rows-[auto_1fr] w-[95%] max-w-max h-[90vh] mx-auto">
        <AdminTableHeading>Потребители</AdminTableHeading>
        <AdminUsersTable />
    </div>
}