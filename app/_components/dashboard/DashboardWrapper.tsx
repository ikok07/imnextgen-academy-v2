import {ReactNode} from "react";
import DashboardSidebar from "@/app/_components/dashboard/sidebar/DashboardSidebar";

type DashboardWrapperProps = {
    children: ReactNode
}

export default function DashboardWrapper({children}: DashboardWrapperProps) {
    return <div className={`grid grid-cols-[auto_1fr] md:grid-cols-[16rem_1fr] gap-3`}>
        <DashboardSidebar />
        <div className="relative md:pr-10">
            {children}
        </div>
    </div>
}