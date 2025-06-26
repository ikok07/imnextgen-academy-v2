"use client"

import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";

type AdminSectionManageVideosTableWrapperProps = {
    isDeletingVideos: boolean,
    isLoadingAllVideos: boolean,
    isRefetchingAlLVideos: boolean
}

export default function AdminSectionManageVideosTableWrapper({isDeletingVideos, isLoadingAllVideos, isRefetchingAlLVideos}: AdminSectionManageVideosTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();

    return <div className={`${isDeletingVideos ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingAllVideos || !viewLoaded} isRefetching={isRefetchingAlLVideos && viewLoaded} rowSize={50} />
    </div>
}