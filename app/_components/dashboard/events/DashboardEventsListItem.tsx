"use client"

import Image from "next/image";
import {Card} from "@/app/_components/ui/shadcn/card";
import {IoInformationCircle, IoLockClosed, IoTime} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {FullMeeting} from "@/drizzle/schema/meetings";
import {getFullMeetingStartTime} from "@/src/entities/utils/meetings/get-full-meeting-start-time.util";
import {useDashboardEvents} from "@/app/_providers/DashboardEventsProvider";
import {useMemo} from "react";
import {getMeetingPlatformIcon} from "@/app/_utils/meetings/getMeetingPlatformIcon";
import {useTheme} from "next-themes";

type DashboardEventsListItemProps = {
    hasAccess: boolean,
    fullMeeting: FullMeeting,
    index: number,
    allItemsCount: number
}

export default function DashboardEventsListItem({hasAccess, fullMeeting, index, allItemsCount}: DashboardEventsListItemProps) {
    const {selectedDate} = useDashboardEvents();
    const {resolvedTheme} = useTheme();

    const startTime = useMemo(() => getFullMeetingStartTime(fullMeeting, selectedDate), [selectedDate])
    const platformImage = getMeetingPlatformIcon(fullMeeting.platform);

    return <div className={`${allItemsCount > 3 && index + 1 === allItemsCount ? "pb-[10rem]" : ""}`}>
        <Card className="cursor-pointer flex gap-3 h-[6.5rem] group hover:translate-x-1.5 hover:bg-secondary/70 dark:hover:bg-border/50 transition-all duration-200 ease-in-out">
            <div className="relative w-[30%] h-full rounded-l-xl overflow-hidden">
                <Image
                    alt="test image"
                    src={fullMeeting.image_url}
                    className="object-cover"
                    fill
                />
            </div>
            <div className="p-2 flex-1 overflow-hidden">
                <h2 className="max-w-[15rem] font-bold truncate">{fullMeeting.title}</h2>
                <p className="max-w-[15rem] text-sm text-primary/70 truncate">{fullMeeting.description}</p>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <IoTime className="text-primary/70 text-lg"/>
                            <span className="text-primary/70 font-bold text-sm">{startTime ? `${startTime.hours}:${startTime.minutes.toString().padStart(2, '0')}` : "-"}</span>
                        </div>
                        <Image
                            alt={fullMeeting.platform}
                            src={resolvedTheme === "dark" ? platformImage.pathDark : platformImage.path}
                            width={platformImage.width}
                            height={20}
                            className="hidden lg:block"
                        />
                    </div>
                    <SecondaryButton className="text-[0.8rem] gap-1 group-hover:text-cta">
                        {hasAccess ?
                            <>
                                <IoInformationCircle className="text-neutral-500 group-hover:text-cta" />
                                Повече
                            </>
                            :
                            <>
                                <IoLockClosed className="text-neutral-500 group-hover:text-cta" />
                                Заключен
                            </>
                        }
                    </SecondaryButton>
                </div>
            </div>
        </Card>
    </div>
}