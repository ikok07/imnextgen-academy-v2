"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";

type AdminModuleManageSectionsTableWrapperProps = {
    isDeletingSections: boolean,
    isLoadingAllSections: boolean,
    isRefetchingAllSections: boolean
}

export default function AdminModuleManageSectionsTableWrapper({isDeletingSections, isLoadingAllSections, isRefetchingAllSections}: AdminModuleManageSectionsTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    return <div className={`${isDeletingSections ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllSections || !viewLoaded} isRefetching={isRefetchingAllSections && viewLoaded} rowSize={50} />
    </div>
}