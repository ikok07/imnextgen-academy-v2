"use client"

import {IoCheckmarkCircle, IoEllipseOutline} from "react-icons/io5";
import {Progress} from "@/app/_components/ui/shadcn/progress";
import {Card} from "@/app/_components/ui/shadcn/card";
import {Section} from "@/drizzle/schema/sections";
import {Dispatch, SetStateAction, useMemo} from "react";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getFinishedVideosForSection} from "@/app/dashboard/actions";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import AdminUserDetailsProgressContainer
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsProgressContainer";

type AdminUserDetailsUserProgressSectionRowProps = {
    section: Section,
    userId: string,
    selectedSectionId: string | null,
    setSelectedSectionId: Dispatch<SetStateAction<string | null>>
}

export default function AdminUserDetailsUserProgressSectionRow({section, userId, selectedSectionId, setSelectedSectionId}: AdminUserDetailsUserProgressSectionRowProps) {
    const {data: finishedVideosQuery, isLoading: isLoadingFinishedVideos, error: finishedVideosError} = useErrorQuery({
        queryFn: () => getFinishedVideosForSection(section.module_id, section.id, userId),
        queryKey: ["finishedVideos", section.module_id, section.id, userId],
    });

    const finishedVideosResult = useMemo(() => {
        if (finishedVideosQuery?.success) return finishedVideosQuery.value;
        // @ts-ignore
    }, [finishedVideosQuery?.value]);

    const isSelected = useMemo(() => section.id === selectedSectionId, [section.id, selectedSectionId]);

    return <AdminUserDetailsProgressContainer
        title={section.title}
        isSelected={isSelected}
        isLoadingPercentage={isLoadingFinishedVideos}
        percentage={finishedVideosResult?.percentage ?? 0}
        onClick={() => setSelectedSectionId(section.id)}
    />
}