"use client"

import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {useEffect, useMemo, useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import CalendarAvailableTimeBox from "@/app/_components/ui/calendar/CalendarAvailableTimeBox";
import {addMinutes, startOfDay} from "date-fns";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllProfilesForRole} from "@/app/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCalendar} from "react-icons/io5";
import CalendarAvailableTimeBoxSkeleton from "@/app/_components/ui/calendar/CalendarAvailableTimeBoxSkeleton";
import {LucideUserRoundX} from "lucide-react";

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

    const allMentors = useMemo(() => {
        if (!mentorsQuery?.success) return [];

        return mentorsQuery.value;
        // @ts-ignore
    }, [mentorsQuery?.value])

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate]);

    const availableTimesContainer = useMemo(() => {
        if (isLoadingMentors) return <div className="grid grid-cols-2 gap-4 self-start">
            {Array.from({length: 6}).map((_, index) => {
                return <CalendarAvailableTimeBoxSkeleton key={index} />
            })}
        </div>

        if (!selectedMentorId) return <PrimaryErrorMessage
            Icon={LucideUserRoundX}
            title="Избери ментор"
            message="Избери ментор, за да видиш свободните му часове"
            className="my-6"
        />;

        if (false) return <PrimaryErrorMessage
            Icon={IoCalendar}
            title="Няма часове"
            message="Няма налични свободни часове"
            className="my-6"
        />;

        return <>
            <div className="grid grid-cols-2 gap-4 self-start">
                {Array.from({length: 6}).map((_, index) => {
                    const date = addMinutes(startOfDay(new Date()).valueOf(), index * 30).valueOf();
                    return <CalendarAvailableTimeBox
                        date={date}
                        selectedTime={selectedTime}
                        key={index}
                        onClick={() => setSelectedTime(date)}
                    />
                })}
            </div>
            <PrimaryButton className="w-full">Създаване</PrimaryButton>
        </>
    }, [selectedTime, isLoadingMentors, selectedMentorId])

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