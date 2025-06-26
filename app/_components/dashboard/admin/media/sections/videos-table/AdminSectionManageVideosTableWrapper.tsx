"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import {useManageSection} from "@/app/_providers/admin/AdminManageSectionProvider";

type AdminSectionManageVideosTableWrapperProps = {
    isDeletingVideos: boolean,
}

export default function AdminSectionManageVideosTableWrapper({isDeletingVideos}: AdminSectionManageVideosTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    const {isLoadingAllVideosForModule, isRefetchingAllVideosForModule} = useManageSection();

    return <div className={`${isDeletingVideos ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllVideosForModule || !viewLoaded} isRefetching={isRefetchingAllVideosForModule && viewLoaded} rowSize={50} />
    </div>
}