"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {z} from "zod";

export const moduleStateSchema = z.object({
    activeSectionId: z.custom<string | null>(),
    selectSection: z.custom<(sectionId: string | null) => void>(),
    activeVideoId: z.custom<string | null>(),
    selectVideo: z.custom<(videoId: string) => void>()
});

export type ModuleState = z.infer<typeof moduleStateSchema>;

const ModuleProviderContext = createContext<ModuleState | null>(null);

type ModuleProviderProps = {
    children: ReactNode
}

export default function ModuleProvider({children}: ModuleProviderProps) {
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    function selectSection(sectionId: string | null) {
        setActiveSectionId(sectionId);
    }

    function selectVideo(videoId: string) {
        setActiveVideoId(videoId);
    }

    return <ModuleProviderContext.Provider value={{
        activeSectionId,
        selectSection,
        activeVideoId,
        selectVideo
    }}>
        {children}
    </ModuleProviderContext.Provider>
}

export function useModule() {
    const context = useContext(ModuleProviderContext);
    if (!context) {
        throw new Error("useModule should be used inside ModuleProvider!");
    }
    return context;
}