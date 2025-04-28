import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/app/_components/ui/shadcn/table";
import {format, getHours, getMinutes, millisecondsToHours} from "date-fns";
import {getTimezoneOffset} from "date-fns-tz/getTimezoneOffset";
import {MeetingDate} from "@/drizzle/schema/meeting_dates";
import {UTCDate} from "@date-fns/utc";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {LucideAlarmClockOff} from "lucide-react";

type DashboardEventsMeetingDatesTableProps = {
    meetingDates: Omit<MeetingDate, "meeting_id">[]
}

export default function DashboardEventsMeetingDatesTable({meetingDates}: DashboardEventsMeetingDatesTableProps) {
    const filteredMeetingDates = meetingDates.filter(d => d.start_date * 1000 > Date.now());

    if (filteredMeetingDates.length === 0) {
        return <PrimaryErrorMessage
            Icon={LucideAlarmClockOff}
            message="Не са насрочени отделни дати"
            title="Няма налични"
            className="mt-3"
            iconClassName="text-[2rem]"
            titleClassName="text-[1.2rem]"
        />
    }

    return <Table
        wrapperDivClassName="max-h-[20rem] scrollbar-hide"
    >
        <TableHeader className="sticky top-0 bg-background">
            <TableRow>
                <TableHead>Ден</TableHead>
                <TableHead>Начало</TableHead>
                <TableHead>Дължина</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filteredMeetingDates.map((date, index) => {
                return <TableRow key={index}>
                    <TableCell>{format(date.start_date * 1000, "dd.MM.yyyy")}</TableCell>
                    <TableCell className="capitalize">{getHours(new UTCDate(date.start_date * 1000)) + millisecondsToHours(getTimezoneOffset("Europe/Sofia"))}:{getMinutes(date.start_date * 1000).toString().padStart(2, '0')}</TableCell>
                    <TableCell className="capitalize">{(date.end_date - date.start_date) / 60} мин.</TableCell>
                </TableRow>
            })}
        </TableBody>
    </Table>
}