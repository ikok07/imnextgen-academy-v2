"use client"

import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {ReactNode, useEffect} from "react";
import {Section} from "@/drizzle/schema/sections";
import {ManageSectionProvider} from "@/app/_providers/admin/AdminManageSectionProvider";

type AdminSectionsManageClientWrapperProps = {
    section: Section,
    children: ReactNode
}

export default function AdminSectionsManageClientWrapper({section, children}: AdminSectionsManageClientWrapperProps) {

    const {hydrationLabels, setHydrationLabels, isLoaded} = useBreadcrumb();

    useEffect(() => {
        if (isLoaded) {
            if (hydrationLabels.some(l => l.segmentId === "section")) return;

            setHydrationLabels([...hydrationLabels, {segmentId: "section", label: section.title}]);

            return () => {
                setHydrationLabels([]);
            }
        }
    }, [isLoaded]);

    return <ManageSectionProvider section={section}>
        {children}
    </ManageSectionProvider>;
}