import AdminTableHeading from "@/app/_components/dashboard/admin/AdminTableHeading";
import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";
import AdminSubmissionsBoard from "@/app/_components/dashboard/admin/submissions/AdminSubmissionsBoard";

export default function Page() {
    return <SetActiveLinkComponent linkId="submissions">
        <div className="grid grid-rows-[auto_1fr] w-[95%] max-w-[70rem] h-[90vh] mx-auto">
            <AdminTableHeading>Предадени задачи</AdminTableHeading>
            <AdminSubmissionsBoard />
        </div>
    </SetActiveLinkComponent>
}
