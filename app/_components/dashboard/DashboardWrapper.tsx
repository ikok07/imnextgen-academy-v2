import {ReactNode} from "react";
import DashboardSidebar from "@/app/_components/dashboard/sidebar/DashboardSidebar";
import {getAllModules} from "@/app/dashboard/actions";

type DashboardWrapperProps = {
    children: ReactNode
}

export default async function DashboardWrapper({children}: DashboardWrapperProps) {
    const modules = await getAllModules();
    console.log(modules);

    return <div className={`grid grid-cols-[auto_1fr] md:grid-cols-[16rem_1fr]`}>
        <DashboardSidebar />
        <div className="relative">
            {children}
        </div>
    </div>
}