"use client"

import {ReactNode, useEffect} from "react";
import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {Module} from "@/drizzle/schema/modules";
import ModuleProvider, {useModule} from "@/app/_providers/ModuleProvider";
import {FinishedVideo} from "@/drizzle/schema/finished_videos";
import {VideosForModuleResponse} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";

type DashboardModuleClientWrapperProps = {
    module: Module,
    videosForModule: VideosForModuleResponse,
    finishedVideos: FinishedVideo[]
    children: ReactNode
}

export default function DashboardModuleClientWrapper(props: DashboardModuleClientWrapperProps) {
    return <ModuleProvider>
        <InnerContent {...props} />
    </ModuleProvider>;
}

function InnerContent({module, videosForModule, finishedVideos, children}: DashboardModuleClientWrapperProps) {
    const {hydrationLabels, setHydrationLabels, isLoaded} = useBreadcrumb();
    const {selectSection, selectVideo} = useModule();
    const lastFinishedVideo = finishedVideos.sort((a, b) => a.created_at - b.created_at)[finishedVideos.length - 1];

    const rawVideosForModule = videosForModule.flatMap(obj => obj.videos);
    const firstModuleVideo = rawVideosForModule.sort((a, b) => a.order_number - b.order_number).at(0);
    const lastVideo = rawVideosForModule.find(v => v.id === lastFinishedVideo?.video_id);

    useEffect(() => {
        if (lastVideo) {
            selectSection(lastVideo.section_id);
            selectVideo(lastVideo.id);
            return;
        }

        if (firstModuleVideo) {
            selectSection(firstModuleVideo.section_id);
            selectVideo(firstModuleVideo.id);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            if (hydrationLabels.some(l => l.segmentId === "module")) return;

            setHydrationLabels([...hydrationLabels, {segmentId: "module", label: module.title}]);

            return () => {
                setHydrationLabels([]);
            }
        }
    }, [isLoaded]);

    return children;
}