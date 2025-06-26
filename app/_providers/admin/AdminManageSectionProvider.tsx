"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {z} from "zod";
import {Section, sectionsSchema} from "@/drizzle/schema/sections";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getSectionById} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/action";
import {VideosForModuleResults} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {VideosForModuleResponse} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import {getSectionsForModule, getVideosForModule} from "@/app/dashboard/actions";
import {Module} from "@/drizzle/schema/modules";
import {videosSchema} from "@/drizzle/schema/videos";

export const manageSectionStateSchema = z.object({
    section: sectionsSchema.optional(),
    allSections: z.array(sectionsSchema).optional(),
    allVideosForModule: z.array(videosSchema).optional(),
    isLoadingAllVideosForModule: z.boolean(),
    isRefetchingAllVideosForModule: z.boolean(),
    isLoadingSection: z.boolean(),
    editMode: z.boolean(),
    setEditMode: z.custom<Dispatch<SetStateAction<boolean>>>(),
    errors: z.array(z.string()),
    setErrors: z.custom<Dispatch<SetStateAction<string[]>>>(),
    hasChanges: z.boolean(),
    title: z.string().nullable(),
    setTitle: z.custom<Dispatch<SetStateAction<string | null>>>(),
    orderNumber: z.string().nullable(),
    setOrderNumber: z.custom<Dispatch<SetStateAction<string | null>>>(),
});

export type ManageSectionState = z.infer<typeof manageSectionStateSchema>;

const ManageSectionContext = createContext<ManageSectionState | null>(null);

type AdminManageSectionProviderProps = {
    module: Module,
    section: Section,
    allSections: Section[],
    allVideosForModule: VideosForModuleResponse,
    children: ReactNode
}

export function ManageSectionProvider({section, module, allSections, allVideosForModule, children}: AdminManageSectionProviderProps) {

    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const {data: allSectionsQuery, isLoading: isLoadingAllSections} = useErrorQuery({
        queryFn: () => getSectionsForModule(module.id),
        queryKey: ["sections", module.id],
        initialData: {success: true, value: allSections}
    });

    const {data: allVideosForModuleQuery, isLoading: isLoadingAllVideosForModule, isRefetching: isRefetchingAllVideosForModule} = useErrorQuery({
        queryFn: () => getVideosForModule(module.id),
        queryKey: ["videos", module.id],
        initialData: {success: true, value: allVideosForModule}
    })

    const clientAllSections = useMemo(() => {
        if (allSectionsQuery?.success) return allSectionsQuery.value;
        // @ts-ignore
    }, [allSectionsQuery?.value, isLoadingAllSections]);

    const clientAllVideosForModule = useMemo(() => {
        if (allVideosForModuleQuery?.success) return allVideosForModuleQuery.value;
        // @ts-ignore
    }, [allVideosForModuleQuery?.value, isLoadingAllSections])

    const clientSection = useMemo(() => {
        return clientAllSections?.find(s => s.id === section.id);
    }, [clientAllSections]);

    const [title, setTitle] = useState<string | null>(clientSection?.title ?? section.title);
    const [orderNumber, setOrderNumber] = useState<string | null>(clientSection?.order_number.toString() ?? section.order_number.toString());

    useEffect(() => {
        setHasChanges(
            title != clientSection?.title ||
            (!!orderNumber && +orderNumber != clientSection?.order_number)
        )
    }, [title, orderNumber]);

    useEffect(() => {
        if (!editMode && clientSection) {
            setTitle(clientSection.title)
            setOrderNumber(clientSection.order_number.toString());
        }
    }, [editMode, clientSection]);

    return <ManageSectionContext.Provider value={{
        section: clientSection,
        allSections,
        allVideosForModule: clientAllVideosForModule?.flatMap(obj => obj.videos),
        isLoadingAllVideosForModule, isRefetchingAllVideosForModule,
        isLoadingSection: isLoadingAllSections,
        editMode, setEditMode,
        errors, setErrors,
        hasChanges,
        title, setTitle,
        orderNumber, setOrderNumber,
    }}>
        {children}
    </ManageSectionContext.Provider>
}

export function useManageSection() {
    const context = useContext(ManageSectionContext);
    if (!context) {
        throw new Error("useManageSection() must be used inside ManageSectionProvider!");
    }
    return context;
}