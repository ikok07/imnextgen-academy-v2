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

// DONE: 1. Fix 'too much recursion' error when opening select menu
// DONE: 2. Integrate google calendar webhooks
// TODO: 3. Develop update event functionality
// TODO: 4. Add option for variable event durations X
// TODO: 5. Show the user it's sales meetings X
// TODO: 6. Fix access policies (make sure the mentors can see only them)

export default function AdminUserDetailsSalesMeetings({fullProfile}: AdminUserDetailsSalesMeetingsProps) {
    const [selectedDate, setSelectedDate] = useState(startOfDay(Date.now()).valueOf());
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);

    return <div className="grid lg:grid-cols-2 h-full">
        <AdminUserDetailsSalesCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} userId={fullProfile.id} selectedMentorId={selectedMentorId} />
        <AdminUserDetailsSalesCreateForm selectedDate={selectedDate} selectedMentorId={selectedMentorId} setSelectedMentorId={setSelectedMentorId} fullProfile={fullProfile}/>
    </div>
}