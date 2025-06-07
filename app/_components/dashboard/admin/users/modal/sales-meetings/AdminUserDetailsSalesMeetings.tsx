import AdminUserDetailsSalesCalendar
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesCalendar";
import {useState} from "react";
import {startOfDay} from "date-fns";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import AdminUserDetailsSalesCreateForm
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesCreateForm";

type AdminUserDetailsSalesMeetingsProps = {
    fullProfile: FullProfile
}

export default function AdminUserDetailsSalesMeetings({fullProfile}: AdminUserDetailsSalesMeetingsProps) {
    const [selectedDate, setSelectedDate] = useState(startOfDay(Date.now()).valueOf());

    return <div className="grid grid-cols-[auto_1fr] h-full">
        <AdminUserDetailsSalesCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} userId={fullProfile.id} />
        <AdminUserDetailsSalesCreateForm selectedDate={selectedDate} fullProfile={fullProfile}/>
    </div>
}