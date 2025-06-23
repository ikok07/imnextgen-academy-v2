"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {z} from "zod";
import {Section, sectionsSchema} from "@/drizzle/schema/sections";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getSectionById} from "@/app/dashboard/admin/media/section/[id]/action";

export const manageSectionStateSchema = z.object({
    section: sectionsSchema.optional(),
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
    section: Section,
    children: ReactNode
}

export function ManageSectionProvider({section, children}: AdminManageSectionProviderProps) {

    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const {data: sectionQuery, isLoading: isLoadingSection, isRefetching: isRefetchingModule} = useErrorQuery({
        queryFn: () => getSectionById(section.id),
        queryKey: ["section", section.id],
        initialData: {success: true, value: section}
    });

    const clientSection = useMemo(() => {
        if (sectionQuery?.success) return sectionQuery.value;
        // @ts-ignore
    }, [sectionQuery?.value, isLoadingSection, isRefetchingModule]);

    const [title, setTitle] = useState<string | null>(clientSection?.title ?? section.title);
    const [orderNumber, setOrderNumber] = useState<string | null>(clientSection?.order_number.toString() ?? section.order_number.toString());

    useEffect(() => {
        setHasChanges(
            title != clientSection?.title ||
            (!!orderNumber && +orderNumber != clientSection?.order_number)
        )
    }, [title, orderNumber]);

    return <ManageSectionContext.Provider value={{
        section: clientSection,
        isLoadingSection,
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