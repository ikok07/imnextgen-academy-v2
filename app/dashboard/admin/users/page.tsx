import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import AdminUsersTable from "@/app/_components/dashboard/admin/users/AdminUsersTable";

export default async function Page() {
    return <div className="border border-black max-w-[60rem] mx-auto grid grid-rows-[auto_1fr]">
        <AdminTableHeading>Потребители</AdminTableHeading>
        <AdminUsersTable />
    </div>
}