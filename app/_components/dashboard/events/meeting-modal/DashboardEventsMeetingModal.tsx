"use client"

import {DialogContent} from "@/app/_components/ui/shadcn/dialog";
import DashboardEventsMeetingHeader
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingHeader";
import DashboardEventsMeetingRepeatDatesTable
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingRepeatDatesTable";
import DashboardEventsMeetingDatesTable
    from "@/app/_components/dashboard/events/meeting-modal/DashboardEventsMeetingDatesTable";
import {FullRegularMeetingStartTime} from "@/src/entities/utils/meetings/get-full-regular-meeting-start-time.util";
import {SerializableUser} from "@/src/entities/models/auth/serializable-user";
import { FullMeeting } from "@/src/entities/models/meetings/full-meeting";

type DashboardEventsMeetingModalProps = {
    fullMeeting: FullMeeting,
    user: SerializableUser,
    startDate: FullRegularMeetingStartTime | undefined
}

export default function DashboardEventsMeetingModal({fullMeeting, user, startDate}: DashboardEventsMeetingModalProps) {
    return <DialogContent className="max-w-[95%] md:max-w-xl">
        <DashboardEventsMeetingHeader fullMeeting={fullMeeting} user={user} startDate={startDate} />
        {fullMeeting.meetingType === "regular" && <div className="grid md:grid-cols-2">
            <div>
                <h1 className="text-lg font-bold">Седмичен график</h1>
                <DashboardEventsMeetingRepeatDatesTable repeatDays={fullMeeting.repeat_days} />
            </div>
            <div>
                <h1 className="text-lg font-bold">Отделни дати</h1>
                <DashboardEventsMeetingDatesTable meetingDates={fullMeeting.meeting_dates} />
            </div>
        </div>}
    </DialogContent>
}