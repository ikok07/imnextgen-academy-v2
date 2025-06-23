import {z} from "zod";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {modulesTableSchema} from "@/drizzle/schema/modules";
import {sectionsSchema} from "@/drizzle/schema/sections";
import {videosSchema} from "@/drizzle/schema/videos";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {
    getAllModules,
    getFinishedVideosForAllSectionsInModule,
    getSectionsForModule,
    getVideosForSection
} from "@/app/dashboard/actions";
import {toast} from "sonner";
import {
    finishedVideosForAllSectionsResponseSchema,
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";
import {getVideoProgressForSection} from "@/app/dashboard/admin/actions";
import {ProgressVideo} from "@/src/entities/models/media/videos/progress-video";

export const userProgressStateSchema = z.object({
    selectedModuleId: z.string().nullable(),
    setSelectedModuleId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    selectedSectionId: z.string().nullable(),
    setSelectedSectionId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    allModules: z.array(modulesTableSchema).optional(),
    sectionsForModule: z.array(sectionsSchema).optional(),
    finishedVideosForAllSectionInModule: finishedVideosForAllSectionsResponseSchema.optional(),
    videoProgressesForSection: z.array(z.custom<ProgressVideo>()).optional(),
    videosForSection: z.array(videosSchema).optional(),

    isLoadingAllModules: z.boolean(),
    isLoadingModuleSections: z.boolean(),
    isLoadingSectionVideos: z.boolean(),
    isLoadingFinishedVideosForAllSectionInModule: z.boolean(),
    isLoadingVideoProgressesForSection: z.boolean()
});

export type UserProgressState = z.infer<typeof userProgressStateSchema>;

const UserProgressContext = createContext<UserProgressState | null>(null);

type UserProgressProviderProps = {
    children: ReactNode,
    userId: string
}

export function UserProgressProvider({children, userId}: UserProgressProviderProps) {
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

    const {data: allModulesQuery, isLoading: isLoadingAllModules} = useErrorQuery({
        queryFn: () => getAllModules(),
        queryKey: ["allModules"],
        onError() {
            toast.error("Модулите не могат да бъдат заредени!");
        }
    });

    const {data: moduleSectionsQuery, isLoading: isLoadingModuleSections} = useErrorQuery({
        queryFn: () => getSectionsForModule(selectedModuleId),
        queryKey: ["sections", selectedModuleId],
        enabled: !!selectedModuleId,
        onError() {
            toast.error("Секциите за модула не могат да бъдат заредени!");
        }
    });

    const {data: sectionVideosQuery, isLoading: isLoadingSectionVideos} = useErrorQuery({
        queryFn: () => getVideosForSection(selectedSectionId),
        queryKey: ["videos", selectedModuleId, selectedSectionId],
        enabled: !!selectedSectionId,
        onError() {
            toast.error(`Видеата за секцията не могат да бъдат заредени!`);
        }
    });

    const {data: finishedVideosForAllSectionInModuleQuery, isLoading: isLoadingFinishedVideosForAllSectionInModule} = useErrorQuery({
        queryFn: () => getFinishedVideosForAllSectionsInModule(selectedModuleId, userId),
        queryKey: ["finishedVideosForModule", userId, selectedModuleId],
        enabled: !!selectedModuleId
    });

    const {data: videoProgressesForSectionQuery, isLoading: isLoadingVideoProgressesForSection} = useErrorQuery({
        queryFn: () => getVideoProgressForSection(userId, selectedSectionId!),
        queryKey: ["video-progresses-for-section", userId, selectedSectionId!],
        enabled: !!selectedSectionId,
        onError() {
            toast.error("Прогресът на видеата в секцията не може да бъде зареден!");
        }
    });

    const allModules = useMemo(() => {
        if (allModulesQuery?.success) return allModulesQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allModulesQuery?.value]);

    const sectionsForModule = useMemo(() => {
        if (moduleSectionsQuery?.success) return moduleSectionsQuery.value;
        // @ts-ignore
    }, [moduleSectionsQuery?.value]);

    const finishedVideosForAllSectionInModule = useMemo(() => {
        if (finishedVideosForAllSectionInModuleQuery?.success) return finishedVideosForAllSectionInModuleQuery.value;
        // @ts-ignore
    }, [finishedVideosForAllSectionInModuleQuery?.value]);

    const videoProgressesForSection = useMemo(() => {
        if (videoProgressesForSectionQuery?.success) return videoProgressesForSectionQuery.value;
        // @ts-ignore
    }, [videoProgressesForSectionQuery?.value])

    const videosForSection = useMemo(() => {
        if (sectionVideosQuery?.success) return sectionVideosQuery.value;
        // @ts-ignore
    }, [sectionVideosQuery?.value]);

    useEffect(() => {
        setSelectedSectionId(null);
    }, [selectedModuleId]);

    return <UserProgressContext.Provider value={{
        selectedModuleId,
        setSelectedModuleId,
        selectedSectionId,
        setSelectedSectionId,
        allModules,
        sectionsForModule,
        finishedVideosForAllSectionInModule,
        videoProgressesForSection,
        videosForSection,
        isLoadingAllModules,
        isLoadingModuleSections,
        isLoadingSectionVideos,
        isLoadingFinishedVideosForAllSectionInModule,
        isLoadingVideoProgressesForSection
    }}>
        {children}
    </UserProgressContext.Provider>
}

export function useUserProgress() {
    const context = useContext(UserProgressContext);
    if (!context) {
        throw new Error("useUserProgress() must be used inside UserProgressProvider");
    }
    return context;
}