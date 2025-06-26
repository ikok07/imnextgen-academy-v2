"use client"

import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {ReactNode, useEffect} from "react";
import {Section} from "@/drizzle/schema/sections";
import {ManageSectionProvider} from "@/app/_providers/admin/AdminManageSectionProvider";
import {Module} from "@/drizzle/schema/modules";

type AdminSectionsManageClientWrapperProps = {
    module: Module,
    section: Section,
    children: ReactNode
}

export default function AdminSectionsManageClientWrapper({module, section, children}: AdminSectionsManageClientWrapperProps) {

    const {hydrationLabels, setHydrationLabels, isLoaded} = useBreadcrumb();

    useEffect(() => {
        if (isLoaded) {
            if (hydrationLabels.some(l => ["module", "section"].includes(l.segmentId))) return;

            setHydrationLabels([...hydrationLabels, {segmentId: "module", label: module.title}, {segmentId: "section", label: section.title}]);

            return () => {
                setHydrationLabels([]);
            }
        }
    }, [isLoaded]);

    return <ManageSectionProvider section={section}>
        {children}
    </ManageSectionProvider>;
}