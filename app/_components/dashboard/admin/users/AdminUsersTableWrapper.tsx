"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {Dialog, DialogTrigger} from "@/app/_components/ui/shadcn/dialog";
import {AdminUserDetailsModal} from "@/app/_components/dashboard/admin/users/modal/AdminUserDetailsModal";
import {Dispatch, SetStateAction} from "react";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

type AdminUsersTableWrapperProps = {
    isDeletingSelectedUsers: boolean,
    isLoadingAllProfiles: boolean,
    isRefetchingAllProfiles: boolean,
    openedUserDetails: string | null,
    setOpenedUserDetails: Dispatch<SetStateAction<string | null>>
}

export default function AdminUsersTableWrapper({isDeletingSelectedUsers, isLoadingAllProfiles, isRefetchingAllProfiles, openedUserDetails, setOpenedUserDetails}: AdminUsersTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    const {table} = useTable();
    const fullProfile = table.getRowModel().rows.find(r => r.original.id === openedUserDetails)?.original as FullProfile | undefined;

    if (!viewLoaded) return;

    return <>
        <Dialog open={!!openedUserDetails} onOpenChange={(v) => !v ? setOpenedUserDetails(null) : {}}>
            {fullProfile && <AdminUserDetailsModal fullProfile={fullProfile} setOpenedUserDetails={setOpenedUserDetails}/>}
        </Dialog>
        <div className={`${isDeletingSelectedUsers ? "pointer-events-none opacity-80" : ""}`}>
            <PrimaryTable isLoading={isLoadingAllProfiles} isRefetching={isRefetchingAllProfiles} rowSize={50} />
        </div>
    </>
}