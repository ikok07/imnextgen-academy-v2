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
import {getMentorSchedules} from "@/app/dashboard/admin/actions";
import {getCalendarAvailableTimes} from "@/app/_components/ui/calendar/utils/get-calendar-available-times";

type AdminUserDetailsSalesCreateFormProps = {
    selectedDate: number,
    fullProfile: FullProfile
}

export default function AdminUserDetailsSalesCreateForm({selectedDate, fullProfile}: AdminUserDetailsSalesCreateFormProps) {
    const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<number | null>(selectedDate);

    const {data: mentorsQuery, isLoading: isLoadingMentors} = useErrorQuery({
        queryFn: () => getAllProfilesForRole("mentor"),
        queryKey: ["mentors"]
    });

    const {data: mentorScheduleQuery, isLoading: isLoadingMentorSchedule} = useErrorQuery({
        queryFn: () => getMentorSchedules(selectedMentorId ?? undefined),
        queryKey: [`mentor-schedule-${selectedMentorId}`],
        enabled: !!selectedMentorId
    });

    const allMentors = useMemo(() => {
        if (!mentorsQuery?.success) return [];

        return mentorsQuery.value;
        // @ts-ignore
    }, [mentorsQuery?.value]);

    const availableTimes = useMemo(() => {
        if (!mentorScheduleQuery?.success) return [];

        const selectedMentorScheduleDay = mentorScheduleQuery.value.days.find(d => d.dayOfWeek === new Date(selectedDate).getDay());
        if (!selectedMentorScheduleDay) return [];

        return getCalendarAvailableTimes({
            dateMs: selectedDate,
            startHour: selectedMentorScheduleDay.startHour,
            startMinutes: selectedMentorScheduleDay.startMinutes,
            totalDurationMinutes: selectedMentorScheduleDay.durationMinutes,
            singleAppointmentDurationMinutes: 30,
            bookedMeetingsDates: []
        });
        // @ts-ignore
    }, [mentorScheduleQuery?.success, mentorScheduleQuery?.value]);

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate]);

    const availableTimesContainer = useMemo(() => {
        if (isLoadingMentors || isLoadingMentorSchedule) return <div className="grid grid-cols-2 gap-4 self-start">
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
            <PrimaryButton className="w-full" disabled={!selectedTime}>Създаване</PrimaryButton>
        </>
    }, [selectedTime, isLoadingMentors, isLoadingMentorSchedule, selectedMentorId])

    return <div className="grid grid-rows-[auto_1fr]">
        <h3 className="text-xl font-semibold mt-3">Създаване на среща</h3>
        <div className="mt-5 w-[95%] max-w-[20rem] mx-auto grid grid-rows-[auto_1fr_auto] gap-y-5">
            <Select disabled={isLoadingMentors} onValueChange={v => setSelectedMentorId(v)}>
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