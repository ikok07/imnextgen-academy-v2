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
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);

    return <div className="grid lg:grid-cols-2 h-full">
        <AdminUserDetailsSalesCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} userId={fullProfile.id} selectedMentorId={selectedMentorId} />
        <AdminUserDetailsSalesCreateForm selectedDate={selectedDate} selectedMentorId={selectedMentorId} setSelectedMentorId={setSelectedMentorId} fullProfile={fullProfile}/>
    </div>
}