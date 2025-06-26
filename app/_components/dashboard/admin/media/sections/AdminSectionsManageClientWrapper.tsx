"use client"

import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {ReactNode, useEffect} from "react";
import {Section} from "@/drizzle/schema/sections";
import {ManageSectionProvider} from "@/app/_providers/admin/AdminManageSectionProvider";
import {Module} from "@/drizzle/schema/modules";
import {VideosForModuleResponse} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";

type AdminSectionsManageClientWrapperProps = {
    module: Module,
    section: Section,
    allSections: Section[],
    allVideosForModule: VideosForModuleResponse,
    children: ReactNode
}

export default function AdminSectionsManageClientWrapper({module, section, allSections, allVideosForModule, children}: AdminSectionsManageClientWrapperProps) {

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

    return <ManageSectionProvider module={module} section={section} allSections={allSections} allVideosForModule={allVideosForModule}>
        {children}
    </ManageSectionProvider>;
}