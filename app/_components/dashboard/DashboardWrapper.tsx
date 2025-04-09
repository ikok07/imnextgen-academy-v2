import {ReactNode} from "react";
import DashboardSidebar from "@/app/_components/dashboard/sidebar/DashboardSidebar";

type DashboardWrapperProps = {
    children: ReactNode
}

export default function DashboardWrapper({children}: DashboardWrapperProps) {
    return <div>
        <DashboardSidebar />
        {children}
    </div>
}