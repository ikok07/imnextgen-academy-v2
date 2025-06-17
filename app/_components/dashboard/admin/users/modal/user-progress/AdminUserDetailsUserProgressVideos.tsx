"use client"

import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoList, IoSearch} from "react-icons/io5";
import AdminUserDetailsUserProgressSectionRowSkeleton
    from "@/app/_components/dashboard/admin/users/modal/user-progress/skeletons/AdminUserDetailsUserProgressSectionRowSkeleton";
import AdminUserDetailsUserProgressVideoRow
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressVideoRow";
import {useUserProgress} from "@/app/_providers/UserProgressProvider";

type AdminUserDetailsUserProgressVideosProps = {
    userId: string,
}

export default function AdminUserDetailsUserProgressVideos({userId}: AdminUserDetailsUserProgressVideosProps) {
    const {selectedSectionId, videosForSection, isLoadingSectionVideos, isLoadingVideoProgressesForSection} = useUserProgress();
    if (!selectedSectionId) {
        return <PrimaryErrorMessage
            Icon={IoList}
            title="Избери секция"
            message="Не е избрана секция, чиито видеа да се изобразят"
        />
    }

    if (isLoadingSectionVideos || isLoadingVideoProgressesForSection) return Array.from({length: 7}).map((_, index) => <AdminUserDetailsUserProgressSectionRowSkeleton key={index} />)

    if (!videosForSection || videosForSection.length === 0) return <PrimaryErrorMessage
        Icon={IoSearch}
        title="Липсват видеа"
        message="Не са налични видеа за тази секция"
    />

    return videosForSection?.sort((a, b) => a.order_number - b.order_number)?.map((video, index) => {
        return <AdminUserDetailsUserProgressVideoRow
            video={video}
            userId={userId}
            key={index}
        />
    });
}