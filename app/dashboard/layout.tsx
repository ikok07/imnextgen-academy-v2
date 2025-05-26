import {ReactNode} from "react";
import DashboardWrapper from "@/app/_components/dashboard/DashboardWrapper";
import DashboardEmailConfirmMessage from "@/app/_components/dashboard/DashboardEmailConfirmMessage";
import DashboardClientWrapper from "@/app/_components/dashboard/DashboardClientWrapper";
import {auth} from "@clerk/nextjs/server";
import {getUser} from "@/app/dashboard/actions";
import RedirectComponent from "@/app/_components/ui/RedirectComponent";
import {Routes} from "@/app/_utils/nav/routes";

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