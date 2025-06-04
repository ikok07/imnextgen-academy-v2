import {getNavlinkAuthResources} from "@/app/_utils/nav/navlinks";
import DashboardSidebarClient from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarClient";
import {getInjection} from "@/di/container";
import {Suspense} from "react";
import DashboardSidebarSkeleton from "@/app/_components/dashboard/nav/sidebar/DashboardSidebarSkeleton";

export default async function DashboardSidebar() {
    return <Suspense fallback={<DashboardSidebarSkeleton />}>
        <InnerContent />
    </Suspense>
}

async function InnerContent() {
    const getUserController = getInjection("IGetUserController");
    const {user, dbProfile} = await getUserController();

    if (!user || !dbProfile) throw new Error("User not found!");

    const checkResourcesController = getInjection("ICheckResourcesAccessController");
    const results = await checkResourcesController({
        principal: {
            id: user.id!,
            roles: dbProfile.roles
        },
        resources: getNavlinkAuthResources(),
    })

    return <DashboardSidebarClient results={results} />
}