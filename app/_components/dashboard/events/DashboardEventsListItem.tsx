"use client"

import Image from "next/image";
import {Card} from "@/app/_components/ui/shadcn/card";
import {IoTime} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {FullMeeting} from "@/drizzle/schema/meetings";
import {getFullMeetingStartTime} from "@/src/entities/utils/meetings/get-full-meeting-start-time.util";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import {useMemo} from "react";

type DashboardEventsListItemProps = {
    fullMeeting: FullMeeting
}

export default function DashboardEventsListItem({fullMeeting}: DashboardEventsListItemProps) {

    const {selectedDate} = useDashboardEvents();

    const startTime = useMemo(() => getFullMeetingStartTime(fullMeeting, selectedDate), [selectedDate])

    return <Card className="flex gap-3 h-[8rem]">
        <div className="relative w-[30%] h-full rounded-l-xl overflow-hidden">
            <Image
                alt="test image"
                src={fullMeeting.image_url}
                className="object-cover"
                fill
            />
        </div>
        <div className="p-2">
            <h2 className="font-bold">{fullMeeting.title}</h2>
            <p className="text-sm text-primary/70">{fullMeeting.description}</p>
            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <IoTime className="text-cta text-lg"/>
                    <span className="text-cta font-bold">{startTime ? `${startTime.hours}:${startTime.minutes}` : "-"}</span>
                </div>
                <SecondaryButton className="text-[0.8rem]">Повече информация</SecondaryButton>
            </div>
        </div>
    </Card>
}