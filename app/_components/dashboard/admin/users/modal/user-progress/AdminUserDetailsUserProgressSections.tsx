"use client"

import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoAlbums} from "react-icons/io5";
import AdminUserDetailsUserProgressSectionRowSkeleton
    from "@/app/_components/dashboard/admin/users/modal/user-progress/skeletons/AdminUserDetailsUserProgressSectionRowSkeleton";
import AdminUserDetailsUserProgressSectionRow
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressSectionRow";
import {useUserProgress} from "@/app/_providers/UserProgressProvider";

export default function AdminUserDetailsUserProgressSections() {
    const {sectionsForModule, selectedModuleId, isLoadingModuleSections, isLoadingFinishedVideosForAllSectionInModule} = useUserProgress()

    if (!selectedModuleId) {
        return <PrimaryErrorMessage
            Icon={IoAlbums}
            title="Избери модул"
            message="Не е избран модул, чиито секции да се изобразят"
        />
    }

    if (isLoadingModuleSections || isLoadingFinishedVideosForAllSectionInModule) return Array.from({length: 7}).map((_, index) => <AdminUserDetailsUserProgressSectionRowSkeleton key={index} />)

    return sectionsForModule?.sort((a, b) => a.order_number - b.order_number)?.map((section, index) => {
        return <AdminUserDetailsUserProgressSectionRow
            section={section}
            key={index}
        />
    });
}