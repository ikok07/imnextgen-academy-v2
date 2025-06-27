import PrimaryTable from "@/app/_components/ui/tables/primary/PrimaryTable";
import { useViewLoaded } from "@/app/_hooks/useViewLoaded";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";

type AdminVideoManageDetailsResourcesTableWrapperProps = {
    isDeletingResources: boolean
}

export default function AdminVideoManageDetailsResourcesTableWrapper({isDeletingResources}: AdminVideoManageDetailsResourcesTableWrapperProps) {
    const {viewLoaded} = useViewLoaded();
    const {isLoadingVideosForModule} = useManageVideo();

    return <div className={`${isDeletingResources ? "pointer-events-none opacity-80" : ""}`}>
        <PrimaryTable isLoading={isLoadingVideosForModule || !viewLoaded} rowSize={50} />
    </div>
}