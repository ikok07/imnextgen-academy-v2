import {ReactNode} from "react";
import DashboardWrapper from "@/app/_components/dashboard/DashboardWrapper";
import DashboardEmailConfirmMessage from "@/app/_components/dashboard/DashboardEmailConfirmMessage";
import DashboardClientWrapper from "@/app/_components/dashboard/DashboardClientWrapper";
import { Routes } from "../_utils/nav/routes";
import RedirectComponent from "../_components/ui/RedirectComponent";
import {getUser} from "@/app/actions";


type LayoutProps = {
    children: ReactNode
}

export default async function Layout({children}: LayoutProps) {
    const res = await getUser();
    if (!res.success) throw new Error("User could not be fetched!");

    if (!res.value.dbProfile?.configured) return <RedirectComponent path={Routes.account.setup} />

    return <DashboardWrapper>
        <DashboardEmailConfirmMessage />
        <DashboardClientWrapper>
            {children}
        </DashboardClientWrapper>
    </DashboardWrapper>
}