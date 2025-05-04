import {ReactNode} from "react";
import DashboardSidebar from "@/app/_components/dashboard/nav/sidebar/DashboardSidebar";
import DashboardSidebarMobileToggleButton
    from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarMobileToggleButton";
import SettingsModal from "@/app/_components/dashboard/settings/SettingsModal";

type DashboardWrapperProps = {
    children: ReactNode
}

export default function DashboardWrapper({children}: DashboardWrapperProps) {
    return <>
        <SettingsModal />
        <div className={`grid grid-cols-[auto_1fr] md:grid-cols-[16rem_1fr] max-h-[100vh] md:gap-3 px-3 md:px-0`}>
            <DashboardSidebar />
            <div className="relative md:pr-10 grid grid-rows-[auto_auto_1fr] max-h-[100vh] col-start-2">
                <DashboardSidebarMobileToggleButton />
                {children}
            </div>
        </div>
    </>
}