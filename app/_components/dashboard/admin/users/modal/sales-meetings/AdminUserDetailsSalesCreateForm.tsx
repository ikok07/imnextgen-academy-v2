"use client"

import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import CalendarAvailableTimeBox from "@/app/_components/ui/calendar/CalendarAvailableTimeBox";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllProfilesForRole} from "@/app/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoAlertCircle, IoCalendar, IoPerson, IoTimer} from "react-icons/io5";
import CalendarAvailableTimeBoxSkeleton from "@/app/_components/ui/calendar/CalendarAvailableTimeBoxSkeleton";
import {
    bookSalesMeeting,
    getCalendarEvents,
    getMentorSchedules
} from "@/app/dashboard/admin/actions";
import {getCalendarAvailableTimes} from "@/app/_components/ui/calendar/utils/get-calendar-available-times";
import {hoursToMilliseconds, minutesToMilliseconds} from "date-fns";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {formatInTimeZone} from "date-fns-tz";
import {toast} from "sonner";
import {useQueryClient} from "react-query";
import AdminUserDetailsSalesCreateMeetingSelects
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesCreateMeetingSelects";

type AdminUserDetailsSalesCreateFormProps = {
    selectedDate: number,
    fullProfile: FullProfile,
    selectedMentorId: string | null,
    setSelectedMentorId: Dispatch<SetStateAction<string | null>>
}

export default function AdminUserDetailsSalesCreateForm({selectedDate, fullProfile, selectedMentorId, setSelectedMentorId}: AdminUserDetailsSalesCreateFormProps) {
    const queryClient = useQueryClient();

    const [selectedTime, setSelectedTime] = useState<number | null>(selectedDate);
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

    const {data: mentorScheduleQuery, isLoading: isLoadingMentorSchedule, isFetching: isRefetchingMentorSchedule} = useErrorQuery({
        queryFn: () => getMentorSchedules(selectedMentorId ?? undefined),
        queryKey: ["mentor-schedule", selectedMentorId, selectedDate],
        enabled: !!selectedMentorId
    });

    const {data: mentorCalendarEventsQuery, isLoading: isLoadingMentorCalendarEvents, isFetching: isRefetchingMentorCalendarEvents, error: mentorCalendarError} = useErrorQuery({
        queryFn: () => getCalendarEvents(selectedMentorId!, {
            timeMin: selectedDate,
            timeMax: selectedDate + hoursToMilliseconds(24)
        }),
        queryKey: ["calendar-events", selectedMentorId, selectedDate],
        enabled: !!selectedMentorId
    });

    const {mutate: createCalendarEventMethod, isLoading: isCreatingCalendarEventMethod} = useErrorMutation({
        mutationFn: () => bookSalesMeeting(fullProfile, selectedMentorId!, selectedTime ?? undefined, selectedDuration ?? 30),
        onError() {
            toast.error("Срещата не беше създадена!");
        },
        onSuccess() {
            toast.success("Срещата беше създадена!");
            setSelectedTime(null);
            queryClient.invalidateQueries(["calendar-events"]);
            queryClient.invalidateQueries(["user-specific-meetings", selectedDate]);
        }
    });

    const selectedDateMentorSchedule = useMemo(() => {
        if (!mentorScheduleQuery?.success) return undefined;
        return mentorScheduleQuery.value.days.find(d => d.dayOfWeek === new Date(selectedDate).getDay());
    }, [selectedMentorId, isRefetchingMentorSchedule]);

    const availableTimes = useMemo(() => {
        if (!mentorCalendarEventsQuery?.success || !selectedDateMentorSchedule || !selectedDuration) return [];

        return getCalendarAvailableTimes({
            dateMs: selectedDate,
            startHour: selectedDateMentorSchedule.startHour,
            startMinutes: selectedDateMentorSchedule.startMinutes,
            totalDurationMinutes: selectedDateMentorSchedule.durationMinutes,
            singleAppointmentDurationMinutes: selectedDuration,
            bookedMeetingsDates: mentorCalendarEventsQuery.value
        });
        // @ts-ignore
    }, [isRefetchingMentorSchedule, isRefetchingMentorCalendarEvents, selectedDate, selectedDuration]);

    const availableTimesContainer = useMemo(() => {
        if (!selectedMentorId) return <PrimaryErrorMessage
            Icon={IoPerson}
            title="Избери ментор"
            message="Избери ментор, за да видиш свободните му часове"
            className="my-6"
        />;

        if (!selectedDuration) return <PrimaryErrorMessage
            Icon={IoTimer}
            title="Избери продължителност"
            message="Избери продължителност, за да видиш свободните часове"
            className="my-6"
        />;

        if (isLoadingMentorSchedule || isLoadingMentorCalendarEvents) return <div className="grid grid-cols-2 gap-4 self-start">
            {Array.from({length: 6}).map((_, index) => {
                return <CalendarAvailableTimeBoxSkeleton key={index} />
            })}
        </div>

        if (mentorCalendarError) return <PrimaryErrorMessage
            Icon={IoAlertCircle}
            title="Възникна грешка"
            message="Менторът не е конфигуриран правилно. Моля, свържи се с екипа ни!"
            className="my-6"
        />;

        if (availableTimes.length === 0) return <PrimaryErrorMessage
            Icon={IoCalendar}
            title="Няма часове"
            message="Няма налични свободни часове"
            className="my-6"
        />;

        return <>
            <div className="grid grid-cols-2 gap-4 self-start max-h-[25rem] overflow-auto">
                {availableTimes.map((time, index) => {
                    return <CalendarAvailableTimeBox
                        date={time}
                        selectedTime={selectedTime}
                        key={index}
                        onClick={() => setSelectedTime(time)}
                    />
                })}
            </div>
            <PrimaryButton className="w-full" disabled={!selectedTime} loading={isCreatingCalendarEventMethod} onClick={() => createCalendarEventMethod()}>Създаване</PrimaryButton>
        </>
    }, [selectedTime, selectedDuration, isLoadingMentorSchedule, isLoadingMentorCalendarEvents, selectedMentorId, availableTimes, isCreatingCalendarEventMethod]);

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate]);

    return <div className="grid grid-rows-[auto_auto_1fr]">
        <h3 className="text-xl font-semibold mt-3">Създаване на среща</h3>
        <div className="mt-5 w-[95%] max-w-[20rem] mx-auto grid grid-rows-[auto_1fr_auto] gap-y-5">
            <AdminUserDetailsSalesCreateMeetingSelects
                isCreatingCalendarEventMethod={isCreatingCalendarEventMethod}
                isLoadingMentorSchedule={isLoadingMentorSchedule}
                isRefetchingMentorSchedule={isRefetchingMentorSchedule}
                selectedDateMentorSchedule={selectedDateMentorSchedule}
                selectedMentorId={selectedMentorId}
                setSelectedDuration={setSelectedDuration}
                setSelectedMentorId={setSelectedMentorId}
            />
            {availableTimesContainer}
        </div>
    </div>
}