"use client"

import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {useEffect, useMemo, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import CalendarAvailableTimeBox from "@/app/_components/ui/calendar/CalendarAvailableTimeBox";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllProfilesForRole} from "@/app/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCalendar, IoPerson} from "react-icons/io5";
import CalendarAvailableTimeBoxSkeleton from "@/app/_components/ui/calendar/CalendarAvailableTimeBoxSkeleton";
import {
    bookSalesMeeting,
    createCalendarEvent,
    getCalendarEvents,
    getMentorSchedules
} from "@/app/dashboard/admin/actions";
import {getCalendarAvailableTimes} from "@/app/_components/ui/calendar/utils/get-calendar-available-times";
import {hoursToMilliseconds, minutesToMilliseconds} from "date-fns";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {formatInTimeZone} from "date-fns-tz";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

type AdminUserDetailsSalesCreateFormProps = {
    selectedDate: number,
    fullProfile: FullProfile
}

export default function AdminUserDetailsSalesCreateForm({selectedDate, fullProfile}: AdminUserDetailsSalesCreateFormProps) {
    const queryClient = useQueryClient();

    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(selectedDate);

    const {data: mentorsQuery, isLoading: isLoadingMentors} = useErrorQuery({
        queryFn: () => getAllProfilesForRole("mentor"),
        queryKey: ["mentors"]
    });

    const {data: mentorScheduleQuery, isLoading: isLoadingMentorSchedule, isFetching: isRefetchingMentorSchedule} = useErrorQuery({
        queryFn: () => getMentorSchedules(selectedMentorId ?? undefined),
        queryKey: [`mentor-schedule-${selectedMentorId}`],
        enabled: !!selectedMentorId
    });

    const {data: mentorCalendarEventsQuery, isLoading: isLoadingMentorCalendarEvents, isFetching: isRefetchingMentorCalendarEvents} = useErrorQuery({
        queryFn: () => getCalendarEvents(selectedMentorId!, {
            timeMin: selectedDate,
            timeMax: selectedDate + hoursToMilliseconds(24)
        }),
        queryKey: [`calendar-events-${selectedMentorId}`],
        enabled: !!selectedMentorId
    });

    const {mutate: createCalendarEventMethod, isLoading: isCreatingCalendarEventMethod} = useErrorMutation({
        mutationFn: () => bookSalesMeeting(fullProfile.id, selectedMentorId!, {
            event: {
                summary: `Sales среща с ${fullProfile.name}`,
                description: `Име: ${fullProfile.name}\nИмейл: ${fullProfile.email}\nТелефон: ${fullProfile.phone}`,
                start: {
                    dateTime: formatInTimeZone(selectedTime!, "Europe/Sofia", "yyyy-MM-dd'T'HH:mm:ssxxx")
                },
                end: {
                    dateTime: formatInTimeZone(selectedTime! + minutesToMilliseconds(30), "Europe/Sofia", "yyyy-MM-dd'T'HH:mm:ssxxx")
                }
            }
        }),
        onError() {
            toast.error("Срещата не беше създадена!");
        },
        onSuccess() {
            toast.success("Срещата беше създадена!");
            setSelectedTime(null);
            queryClient.invalidateQueries([`calendar-events-${selectedMentorId}`]);
            queryClient.invalidateQueries([`user-specific-meetings-${selectedDate}`]);
        }
    });

    const allMentors = useMemo(() => {
        if (!mentorsQuery?.success) return [];

        return mentorsQuery.value;
        // @ts-ignore
    }, [mentorsQuery?.value]);

    const availableTimes = useMemo(() => {
        if (!mentorScheduleQuery?.success) return [];
        if (!mentorCalendarEventsQuery?.success) return [];

        const selectedMentorScheduleDay = mentorScheduleQuery.value.days.find(d => d.dayOfWeek === new Date(selectedDate).getDay());
        if (!selectedMentorScheduleDay) return [];

        return getCalendarAvailableTimes({
            dateMs: selectedDate,
            startHour: selectedMentorScheduleDay.startHour,
            startMinutes: selectedMentorScheduleDay.startMinutes,
            totalDurationMinutes: selectedMentorScheduleDay.durationMinutes,
            singleAppointmentDurationMinutes: 30,
            bookedMeetingsDates: mentorCalendarEventsQuery.value
        });
        // @ts-ignore
    }, [isRefetchingMentorSchedule, isRefetchingMentorCalendarEvents, selectedDate]);

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate]);

    const availableTimesContainer = useMemo(() => {
        if (isLoadingMentors || isLoadingMentorSchedule || isLoadingMentorCalendarEvents) return <div className="grid grid-cols-2 gap-4 self-start">
            {Array.from({length: 6}).map((_, index) => {
                return <CalendarAvailableTimeBoxSkeleton key={index} />
            })}
        </div>

        if (!selectedMentorId) return <PrimaryErrorMessage
            Icon={IoPerson}
            title="Избери ментор"
            message="Избери ментор, за да видиш свободните му часове"
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
    }, [selectedTime, isLoadingMentors, isLoadingMentorSchedule, isLoadingMentorCalendarEvents, selectedMentorId, availableTimes, isCreatingCalendarEventMethod])

    return <div className="grid grid-rows-[auto_1fr]">
        <h3 className="text-xl font-semibold mt-3">Създаване на среща</h3>
        <div className="mt-5 w-[95%] max-w-[20rem] mx-auto grid grid-rows-[auto_1fr_auto] gap-y-5">
            <Select disabled={isLoadingMentors || isCreatingCalendarEventMethod} value={selectedMentorId ?? undefined} onValueChange={v => setSelectedMentorId(v)}>
                <SelectTrigger>
                    <SelectValue placeholder="Ментор" />
                </SelectTrigger>
                <SelectContent>
                    {allMentors.map((mentor, index) => {
                        return <SelectItem value={mentor.id} key={index}>{mentor.name} ({mentor.email})</SelectItem>
                    })}
                </SelectContent>
            </Select>
            {availableTimesContainer}
        </div>
    </div>
}