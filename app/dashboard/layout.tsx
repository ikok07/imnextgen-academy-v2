import {ReactNode} from "react";
import DashboardWrapper from "@/app/_components/dashboard/DashboardWrapper";
import DashboardEmailConfirmMessage from "@/app/_components/dashboard/DashboardEmailConfirmMessage";
import DashboardClientWrapper from "@/app/_components/dashboard/DashboardClientWrapper";

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({children}: LayoutProps) {
    return <DashboardWrapper>
        <DashboardEmailConfirmMessage />
        <DashboardClientWrapper>
            {children}
        </DashboardClientWrapper>
    </DashboardWrapper>
}