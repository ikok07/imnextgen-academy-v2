"use client"

import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoList} from "react-icons/io5";
import AdminUserDetailsUserProgressSectionRowSkeleton
    from "@/app/_components/dashboard/admin/users/modal/user-progress/skeletons/AdminUserDetailsUserProgressSectionRowSkeleton";
import {Video} from "@/drizzle/schema/videos";
import AdminUserDetailsUserProgressVideoRow
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressVideoRow";

type AdminUserDetailsUserProgressVideosProps = {
    selectedSectionId: string | null,
    isLoading: boolean,
    videos: Video[] | undefined,
    userId: string,
}

export default function AdminUserDetailsUserProgressVideos({selectedSectionId, isLoading, videos, userId}: AdminUserDetailsUserProgressVideosProps) {
    if (!selectedSectionId) {
        return <PrimaryErrorMessage
            Icon={IoList}
            title="Избери секция"
            message="Не е избрана секция, чиито видеа да се изобразят"
        />
    }

    if (isLoading) return Array.from({length: 7}).map((_, index) => <AdminUserDetailsUserProgressSectionRowSkeleton key={index} />)

    return videos?.sort((a, b) => a.order_number - b.order_number)?.map((video, index) => {
        return <AdminUserDetailsUserProgressVideoRow
            video={video}
            userId={userId}
            key={index}
        />
    });
}