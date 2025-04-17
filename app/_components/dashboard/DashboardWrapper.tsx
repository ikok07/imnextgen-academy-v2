import {ReactNode} from "react";
import DashboardSidebar from "@/app/_components/dashboard/nav/sidebar/DashboardSidebar";

type DashboardWrapperProps = {
    children: ReactNode
}

export default function DashboardWrapper({children}: DashboardWrapperProps) {
    return <div className={`grid grid-cols-[auto_1fr] md:grid-cols-[16rem_1fr] max-h-[100vh] gap-3`}>
        <DashboardSidebar />
        <div className="relative md:pr-10 grid grid-rows-[auto_1fr] max-h-[100vh] col-start-2">
            {children}
        </div>
    </div>
}