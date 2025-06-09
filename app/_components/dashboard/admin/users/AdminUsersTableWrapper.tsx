"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";

type AdminUsersTableWrapperProps = {
    isDeletingSelectedUsers: boolean,
    isLoadingAllProfiles: boolean,
    isRefetchingAllProfiles: boolean
}

export default function AdminUsersTableWrapper({isDeletingSelectedUsers, isLoadingAllProfiles, isRefetchingAllProfiles}: AdminUsersTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();

    if (!viewLoaded) return;

    return <div className={`${isDeletingSelectedUsers ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllProfiles} isRefetching={isRefetchingAllProfiles} rowSize={50} />
    </div>
}