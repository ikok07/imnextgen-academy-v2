import {ReactNode} from "react";
import DashboardWrapper from "@/app/_components/dashboard/DashboardWrapper";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return <DashboardWrapper>
        {children}
    </DashboardWrapper>
}