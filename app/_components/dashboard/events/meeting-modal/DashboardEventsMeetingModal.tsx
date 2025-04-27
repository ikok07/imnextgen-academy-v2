"use client"

import {DialogContent} from "@/app/_components/ui/shadcn/dialog";
import {FullMeeting} from "@/drizzle/schema/meetings";
import DashboardEventsMeetingHeader
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingHeader";
import DashboardEventsMeetingRepeatDatesTable
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingRepeatDatesTable";
import DashboardEventsMeetingDatesTable
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingDatesTable";

type DashboardEventsMeetingModalProps = {
    fullMeeting: FullMeeting
}

export default function DashboardEventsMeetingModal({fullMeeting}: DashboardEventsMeetingModalProps) {
    return <DialogContent className="max-w-[95%] md:max-w-xl">
        <DashboardEventsMeetingHeader fullMeeting={fullMeeting} />
        <div className="grid md:grid-cols-2">
            <div>
                <h1 className="text-lg font-bold">Седмичен график</h1>
                <DashboardEventsMeetingRepeatDatesTable repeatDays={fullMeeting.repeat_days} />
            </div>
            <div>
                <h1 className="text-lg font-bold">Отделни дати</h1>
                <DashboardEventsMeetingDatesTable meetingDates={fullMeeting.meeting_dates} />
            </div>
        </div>
    </DialogContent>
}