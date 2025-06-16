import {z} from "zod";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {modulesTableSchema} from "@/drizzle/schema/modules";
import {sectionsSchema} from "@/drizzle/schema/sections";
import {videosSchema} from "@/drizzle/schema/videos";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllModules, getSectionsForModule, getVideosForSection} from "@/app/dashboard/actions";
import {toast} from "sonner";

export const userProgressStateSchema = z.object({
    selectedModuleId: z.string().nullable(),
    setSelectedModuleId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    selectedSectionId: z.string().nullable(),
    setSelectedSectionId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    allModules: z.array(modulesTableSchema).optional(),
    sectionsForModule: z.array(sectionsSchema).optional(),
    videosForSection: z.array(videosSchema).optional(),

    isLoadingAllModules: z.boolean(),
    isLoadingModuleSections: z.boolean(),
    isLoadingSectionVideos: z.boolean()
});

export type UserProgressState = z.infer<typeof userProgressStateSchema>;

const UserProgressContext = createContext<UserProgressState | null>(null);

type UserProgressProviderProps = {
    children: ReactNode
}

export function UserProgressProvider({children}: UserProgressProviderProps) {

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

    const allModules = useMemo(() => {
        if (allModulesQuery?.success) return allModulesQuery.value.sort((a, b) => a.order_number - b.order_number);
        // @ts-ignore
    }, [allModulesQuery?.value]);

    const sectionsForModule = useMemo(() => {
        if (moduleSectionsQuery?.success) return moduleSectionsQuery.value;
        // @ts-ignore
    }, [moduleSectionsQuery?.value]);

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
        videosForSection,
        isLoadingAllModules,
        isLoadingModuleSections,
        isLoadingSectionVideos
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