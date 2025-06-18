"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";

type AdminModulesTableWrapperProps = {
    isLoadingAllModules: boolean,
    isRefetchingAllModules: boolean
}

export default function AdminModulesTableWrapper({isLoadingAllModules, isRefetchingAllModules}: AdminModulesTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    if (!viewLoaded) return;

    return <div className={`${false ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllModules} isRefetching={isRefetchingAllModules} rowSize={50} />
    </div>
}