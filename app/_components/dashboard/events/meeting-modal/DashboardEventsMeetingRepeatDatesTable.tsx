import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/app/_components/ui/shadcn/table";
import {MeetingRepeatDay} from "@/drizzle/schema/meeting_repeat_days";
import {getWeekdayLabel} from "@/app/_utils/meetings/getWeekdayLabel";
import {millisecondsToHours} from "date-fns";
import {getTimezoneOffset} from "date-fns-tz/getTimezoneOffset";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {LucideCalendarOff} from "lucide-react";

type DashboardEventsMeetingRepeatDatesTableProps = {
    repeatDays: Omit<MeetingRepeatDay, "meeting_id">[]
}

export default function DashboardEventsMeetingRepeatDatesTable({repeatDays}: DashboardEventsMeetingRepeatDatesTableProps) {

    if (repeatDays.length === 0) {
        return <PrimaryErrorMessage
            Icon={LucideCalendarOff}
            message="Не е наличен седмичен график"
            title="Няма налични"
            className="mt-3"
            iconClassName="text-[2rem]"
            titleClassName="text-[1.2rem]"
        />
    }

    return <Table
        wrapperDivClassName="max-h-[21rem] scrollbar-hide"
    >
        <TableHeader className="sticky top-0 bg-background">
            <TableRow>
                <TableHead>Ден</TableHead>
                <TableHead>Начало</TableHead>
                <TableHead>Дължина</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {repeatDays.map((day, index) => {
                return <TableRow key={index}>
                    <TableCell className="capitalize">{getWeekdayLabel(day.day_of_week)}</TableCell>
                    <TableCell>{day.start_hour_utc + millisecondsToHours(getTimezoneOffset("Europe/Sofia"))}:{day.start_minutes_utc.toString().padStart(2, '0')}</TableCell>
                    <TableCell>{day.duration_minutes} мин.</TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}