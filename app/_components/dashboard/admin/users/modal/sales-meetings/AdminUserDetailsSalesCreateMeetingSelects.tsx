"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/app/_components/ui/shadcn/select";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import { getAllProfilesForRole } from "@/app/actions";
import {Dispatch, SetStateAction, useMemo} from "react";
import {FullMentorScheduleDay} from "@/src/entities/models/meetings/full-mentor-schedule";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";

type AdminUserDetailsSalesCreateMeetingSelectsProps = {
    selectedMentorId: string | null,
    setSelectedMentorId: Dispatch<SetStateAction<string | null>>,
    setSelectedDuration: Dispatch<SetStateAction<number | null>>,
    selectedDateMentorSchedule: FullMentorScheduleDay | undefined,
    isLoadingMentorSchedule: boolean,
    isRefetchingMentorSchedule: boolean,
    isCreatingCalendarEventMethod: boolean
}

export default function AdminUserDetailsSalesCreateMeetingSelects({selectedMentorId, setSelectedMentorId, setSelectedDuration, selectedDateMentorSchedule, isLoadingMentorSchedule, isRefetchingMentorSchedule, isCreatingCalendarEventMethod}: AdminUserDetailsSalesCreateMeetingSelectsProps) {
    const {data: mentorsQuery, isLoading: isLoadingMentors} = useErrorQuery({
        queryFn: () => getAllProfilesForRole("mentor"),
        queryKey: ["mentors"]
    });

    const allMentors = useMemo(() => {
        if (!mentorsQuery?.success) return [];

        return mentorsQuery.value;
        // @ts-ignore
    }, [mentorsQuery?.value]);

    const durationSelectorDisabled = !selectedMentorId || !selectedDateMentorSchedule || isLoadingMentors || isLoadingMentorSchedule || isRefetchingMentorSchedule || isCreatingCalendarEventMethod;

    return <>
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
        <Select disabled={durationSelectorDisabled} onValueChange={v => setSelectedDuration(+v)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className={`${durationSelectorDisabled ? "cursor-not-allowed" : ""}`}>
                        <SelectTrigger>
                            <SelectValue placeholder="Продължителност" />
                        </SelectTrigger>
                    </TooltipTrigger>
                    {durationSelectorDisabled && <TooltipContent>
                        {!selectedMentorId ? "Не е избран ментор" : !selectedDateMentorSchedule ? "Менторът няма въведен график за избраната дата" : "Данните се зареждат..."}
                    </TooltipContent>}
                </Tooltip>
            </TooltipProvider>
            <SelectContent>
                {Array.from({length: 4}).map((_, index) => {
                    const minutes = (index + 1) * 15;
                    return <SelectItem value={minutes.toString()} key={index}>{minutes} мин. {selectedDateMentorSchedule && selectedDateMentorSchedule?.preferred_duration_minutes === minutes && "(предпочитана)"}</SelectItem>
                })}
            </SelectContent>
        </Select>
    </>
}