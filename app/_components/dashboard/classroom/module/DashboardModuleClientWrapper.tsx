"use client"

import {ReactNode, useEffect} from "react";
import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {Module} from "@/drizzle/schema/modules";

type DashboardModuleClientWrapperProps = {
    module: Module
    children: ReactNode
}

export default function DashboardModuleClientWrapper({module, children}: DashboardModuleClientWrapperProps) {
    const {hydrationLabels, setHydrationLabels, isLoaded} = useBreadcrumb();

    useEffect(() => {
        if (isLoaded) {
            if (hydrationLabels.some(l => l.segmentId === "module")) return;

            setHydrationLabels([...hydrationLabels, {segmentId: "module", label: module.title}])

            return () => {
                setHydrationLabels([]);
            }
        }
    }, [isLoaded]);

    return children;
}