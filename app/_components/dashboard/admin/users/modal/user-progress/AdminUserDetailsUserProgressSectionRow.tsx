"use client"

import {IoCheckmarkCircle, IoEllipseOutline} from "react-icons/io5";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {Card} from "@/app/_components/ui/shadcn/card";
import {Section} from "@/drizzle/schema/sections";
import {useMemo} from "react";
import {useUserProgress} from "@/app/_providers/admin/UserProgressProvider";

type AdminUserDetailsUserProgressSectionRowProps = {
    section: Section
}

export default function AdminUserDetailsUserProgressSectionRow({section}: AdminUserDetailsUserProgressSectionRowProps) {
    const {selectedSectionId, setSelectedSectionId, finishedVideosForAllSectionInModule} = useUserProgress();

    const isSelected = useMemo(() => section.id === selectedSectionId, [section.id, selectedSectionId]);

    const percentage = finishedVideosForAllSectionInModule?.sections.find(s => s.id === section.id)?.percentage ?? 0;

    return <Card className="cursor-pointer px-3 py-2 self-start hover:bg-border/50 transition-all duration-200" onClick={() => setSelectedSectionId(section.id)}>
        <div className="grid grid-cols-[1fr_auto] items-center mb-1">
            <h4>{section.title}</h4>
            {isSelected == undefined ? <></> : isSelected ? <IoCheckmarkCircle className="text-cta text-xl"/> : <IoEllipseOutline className="text-primary/70 text-xl"/>}
        </div>
        <div className="flex items-center gap-3">
            <Progress value={percentage} sliderClassName={`${isSelected ? "bg-cta dark:bg-cta" : "bg-cta dark:bg-white"} `} className="flex-1"/>
            <h5 className="font-black text-cta text-sm">{percentage ? isNaN(percentage) ? "-" : `${percentage}%` : "0%"}</h5>
        </div>
    </Card>
}