import {ReactNode} from "react";
import DashboardWrapper from "@/app/_components/dashboard/DashboardWrapper";
import DashboardEmailConfirmMessage from "@/app/_components/dashboard/DashboardEmailConfirmMessage";
import {getInjection} from "@/di/container";
import {redirect} from "next/navigation";

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({children}: LayoutProps) {
    const getUserController = getInjection("IGetUserController");

    const {user} = await getUserController();

    if (!user) redirect("/");

    return <DashboardWrapper>
        {user.emailAddresses[0].verification?.status !== "verified" && <DashboardEmailConfirmMessage />}
        {children}
    </DashboardWrapper>
}