import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {z} from "zod";

export const breadcrumbSegmentSchema = z.object({
    id: z.string(), // used for manipulating label from specific component
    label: z.string().nullable(),
    href: z.string()
})

export const breadcrumbHydrationLabelSchema = z.object({
    segmentId: z.string(),
    label: z.string()
})

export const initialDashboardBreadcrumbStateSchema = z.object({
    segments: z.array(breadcrumbSegmentSchema),
    addSegment: z.custom<(segment: BreadcrumbSegment) => void>(),
    updateSegment: z.custom<(segmentId: string, newSegment: BreadcrumbSegment) => void>(),
    clearSegments: z.custom<() => void>(),
    hydrationLabels: z.array(breadcrumbHydrationLabelSchema),
    setHydrationLabels: z.custom<(labels: BreadcrumbHydrationLabel[]) => void>(),
    isLoaded: z.boolean(),
    setIsLoaded: z.custom<(value: boolean) => void>()
})

export type BreadcrumbState = z.infer<typeof initialDashboardBreadcrumbStateSchema>;
export type BreadcrumbSegment = z.infer<typeof breadcrumbSegmentSchema>;
export type BreadcrumbHydrationLabel = z.infer<typeof breadcrumbHydrationLabelSchema>;

const BreadcrumbContext = createContext<BreadcrumbState | null>(null);

type BreadcrumbProviderProps = {
    children: ReactNode
}

export function BreadcrumbProvider({children}: BreadcrumbProviderProps) {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [segments, setSegments] = useState<BreadcrumbSegment[]>([]);
    const [hydrationLabels, setHydrationLabels] = useState<BreadcrumbHydrationLabel[]>([]);

    function addSegment(segment: BreadcrumbSegment) {
        setSegments(v => [...v, segment]);
    }

    function updateSegment(segmentId: string, newSegment: BreadcrumbSegment) {
        if (!segments.some(s => s.id === segmentId)) {
            addSegment(newSegment);
            return;
        }
        setSegments(v => [...(v.filter(s => s.id !== segmentId)), newSegment]);
    }

    function updateHydrationLabels(labels: BreadcrumbHydrationLabel[]) {
        setHydrationLabels(labels);
    }

    function clearSegments() {
        setSegments([]);
    }

    function updateIsLoaded(value: boolean) {
        setIsLoaded(value);
    }

    useEffect(() => {
        if (hydrationLabels.length > 0 && isLoaded) {
            for (const labelObj of hydrationLabels) {
                const foundSegment = segments.find(s => s.id === labelObj.segmentId);
                if (foundSegment) {
                    foundSegment.label = labelObj.label;
                    setSegments(v => [...(v.filter(s => s.id !== foundSegment.id)), foundSegment])
                }
            }
        }
    }, [hydrationLabels, isLoaded]);

    return <BreadcrumbContext.Provider value={{
        segments,
        addSegment,
        updateSegment,
        clearSegments,
        hydrationLabels,
        setHydrationLabels: updateHydrationLabels,
        isLoaded,
        setIsLoaded: updateIsLoaded
    }}>
        {children}
    </BreadcrumbContext.Provider>
}

export function useBreadcrumb() {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadrumb needs to be used inside BreadcrumbContext!");
    }
    return context;
}