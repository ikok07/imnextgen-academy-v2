"use client"

import {ReactNode} from "react";
import {BreadcrumbProvider} from "@/app/_providers/BreadcrumbProvider";
import CustomBreadcrumb from "@/app/_components/ui/breadcrumb/CustomBreadcrumb";
import {BREADCRUMB_LABELS} from "@/app/_utils/nav/breadcrumbLabels";

type DashboardClientWrapperProps = {
    children: ReactNode
}

export default function DashboardClientWrapper({children}: DashboardClientWrapperProps) {
    return <BreadcrumbProvider>
        <CustomBreadcrumb
            customStaticLabels={BREADCRUMB_LABELS}
            firstExcludedSegments={1} // exclude the /dashboard part of the URI
            className="my-4"
        />
        {children}
    </BreadcrumbProvider>
}