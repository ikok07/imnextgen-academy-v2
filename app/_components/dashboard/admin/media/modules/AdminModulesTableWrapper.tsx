"use client"

import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";

type AdminModulesTableWrapperProps = {
    isDeletingModules: boolean,
    isLoadingAllModules: boolean,
    isRefetchingAllModules: boolean
}

export default function AdminModulesTableWrapper({isDeletingModules, isLoadingAllModules, isRefetchingAllModules}: AdminModulesTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    if (!viewLoaded) return;

    return <div className={`${isDeletingModules ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllModules} isRefetching={isRefetchingAllModules} rowSize={50} />
    </div>
}