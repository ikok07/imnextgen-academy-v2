"use client"

import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoAlbums} from "react-icons/io5";
import AdminUserDetailsUserProgressSectionRowSkeleton
    from "@/app/_components/dashboard/admin/users/modal/user-progress/skeletons/AdminUserDetailsUserProgressSectionRowSkeleton";
import AdminUserDetailsUserProgressSectionRow
    from "@/app/_components/dashboard/admin/users/modal/user-progress/AdminUserDetailsUserProgressSectionRow";
import {Section} from "@/drizzle/schema/sections";
import {Dispatch, SetStateAction} from "react";

type AdminUserDetailsUserProgressSectionsProps = {
    selectedModuleId: string | null,
    isLoading: boolean,
    sections: Section[] | undefined,
    userId: string,
    selectedSectionId: string | null,
    setSelectedSectionId: Dispatch<SetStateAction<string | null>>
}

export default function AdminUserDetailsUserProgressSections({selectedModuleId, isLoading, sections, userId, selectedSectionId, setSelectedSectionId}: AdminUserDetailsUserProgressSectionsProps) {
    if (!selectedModuleId) {
        return <PrimaryErrorMessage
            Icon={IoAlbums}
            title="Избери модул"
            message="Не е избран модул, чиито секции да се изобразят"
        />
    }

    if (isLoading) return Array.from({length: 7}).map((_, index) => <AdminUserDetailsUserProgressSectionRowSkeleton key={index} />)

    return sections?.sort((a, b) => a.order_number - b.order_number)?.map((section, index) => {
        return <AdminUserDetailsUserProgressSectionRow
            section={section}
            userId={userId}
            selectedSectionId={selectedSectionId}
            setSelectedSectionId={setSelectedSectionId}
            key={index}
        />
    });
}