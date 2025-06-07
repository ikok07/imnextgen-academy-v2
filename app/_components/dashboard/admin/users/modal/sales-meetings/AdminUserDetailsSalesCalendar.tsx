import {addMonths} from "date-fns";
import {bg} from "date-fns/locale";
import {Calendar} from "@/app/_components/ui/shadcn/calendar";
import {Dispatch, SetStateAction, useMemo} from "react";
import {Card} from "@/app/_components/ui/shadcn/card";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoAlarm, IoTrash} from "react-icons/io5";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getUserSpecificMeetingsByUserId} from "@/app/dashboard/admin/users/actions";
import { toast } from "sonner";
import AdminUserDetailsSalesMeetingRow
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesMeetingRow";
import AdminUserDetailsSalesMeetingRowSkeleton
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/skeletons/AdminUserDetailsSalesMeetingRowSkeleton";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";

type AdminUserDetailsSalesCalendarProps = {
    selectedDate: number,
    setSelectedDate: Dispatch<SetStateAction<number>>,
    selectedMentorId: string | null
    userId: string
}

export default function AdminUserDetailsSalesCalendar({selectedDate, setSelectedDate, selectedMentorId, userId}: AdminUserDetailsSalesCalendarProps) {
    const {data: userSpecificMeetingsQuery, isLoading} = useErrorQuery({
        queryFn: () => getUserSpecificMeetingsByUserId({
            userId,
            timezoneOffsetMin: -(new Date().getTimezoneOffset()),
            startDate: selectedDate,
            meetingType: "sales-meeting"
        }),
        queryKey: [`user-specific-meetings-${selectedDate}`],
        onError() {
            toast.error("Срещите не може да бъдат заредени!");
        }
    });

    const salesMeetings = useMemo(() => {
        if (!userSpecificMeetingsQuery?.success) return [];

        return userSpecificMeetingsQuery.value;
        // @ts-ignore
    }, [userSpecificMeetingsQuery?.value.length]);

    const salesMeetingsContainer = useMemo(() => {
        if (isLoading) return Array.from({length: 4}).map((_, index) => <AdminUserDetailsSalesMeetingRowSkeleton key={index} />);

        if (salesMeetings.length === 0) return <PrimaryErrorMessage
            Icon={IoAlarm}
            title="Няма запазени срещи"
            message="Не бяха открити срещи с този потребител на избраната дата"
            className="mt-3"
        />

        return <>
            {salesMeetings.map((salesMeeting, index) => {
                return <AdminUserDetailsSalesMeetingRow salesMeeting={salesMeeting} selectedDate={selectedDate} selectedMentorId={selectedMentorId} key={index} />
            })}
        </>
    }, [salesMeetings.length, isLoading]);

    return <div className="grid grid-rows-[auto_1fr]">
        <Calendar
            mode="single"
            selected={new Date(selectedDate)}
            required={true}
            onSelect={d => d ? setSelectedDate(d.getTime()) : {}}
            toMonth={addMonths(new Date(), 1)}
            locale={bg}
            className="sm:justify-self-center"
        />
        <div className="mt-3 grid grid-rows-[auto_1fr]">
            <h4 className="text-lg font-semibold">Запазени срещи</h4>
            <div className="space-y-4 mt-3 h-[17rem] overflow-auto">
                {salesMeetingsContainer}
            </div>
        </div>
    </div>
}