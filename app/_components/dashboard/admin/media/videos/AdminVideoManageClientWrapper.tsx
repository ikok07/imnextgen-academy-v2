"use client"

import {ReactNode, useEffect} from "react";
import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {Module} from "@/drizzle/schema/modules";
import {Section} from "@/drizzle/schema/sections";
import {Video} from "@/drizzle/schema/videos";

type AdminVideoManageClientWrapperProps = {
    children: ReactNode,
    module: Module,
    section: Section,
    video: Video
}

export default function AdminVideoManageClientWrapper({module, section, video, children}: AdminVideoManageClientWrapperProps) {

    const {hydrationLabels, setHydrationLabels, isLoaded} = useBreadcrumb();

    useEffect(() => {
        if (isLoaded) {
            if (hydrationLabels.some(l => ["module", "section", "video"].includes(l.segmentId))) return;

            setHydrationLabels([...hydrationLabels, {segmentId: "module", label: module.title}, {segmentId: "section", label: section.title}, {segmentId: "video", label: video.title}]);

            return () => {
                setHydrationLabels([]);
            }
        }
    }, [isLoaded]);

    return children;
}