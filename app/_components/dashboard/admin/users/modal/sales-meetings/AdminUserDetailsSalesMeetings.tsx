import AdminUserDetailsSalesCalendar
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesCalendar";
import {useState} from "react";
import {startOfDay} from "date-fns";

export default function AdminUserDetailsSalesMeetings() {

    const [selectedDate, setSelectedDate] = useState(startOfDay(Date.now()).valueOf());

    return <div className="grid grid-cols-[auto_1fr] h-full">
        <AdminUserDetailsSalesCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </div>
}