import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import AdminModulesTable from "@/app/_components/dashboard/admin/media/modules/AdminModulesTable";

// DONE: 1. Finish module creation
// DONE: 2. Add delete module functionality
// DONE: 3. Create module details page
// DONE: 3.1 Add update module's image option
// DONE: 4. List sections for module
// DONE: 5. Make design responsive
// DONE: 6. Add skeletons to module details page
// TODO: 7. Add section creation and deletion functionality

export default function Page() {
    return <div className="grid grid-rows-[auto_1fr] w-[95%] max-w-max h-[90vh] mx-auto">
        <AdminTableHeading>Модули</AdminTableHeading>
        <AdminModulesTable />
    </div>
}