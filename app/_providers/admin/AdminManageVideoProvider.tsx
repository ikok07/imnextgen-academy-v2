import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {z} from "zod";
import {Video, videosSchema} from "@/drizzle/schema/videos";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {
    getVideoById,
    getVideoDescriptionById
} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/video/[videoId]/actions";
import {videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";
import {getSignedTokens} from "@/app/dashboard/actions";
import {getVideoDescriptions} from "@/app/dashboard/admin/media/actions";

export const manageVideoState = z.object({
    video: videosSchema.optional(),
    isLoadingVideo: z.boolean(),
    editMode: z.boolean(),
    setEditMode: z.custom<Dispatch<SetStateAction<boolean>>>(),
    errors: z.array(z.string()),
    setErrors: z.custom<Dispatch<SetStateAction<string[]>>>(),
    hasChanges: z.boolean(),
    videoFile: z.custom<File>().nullable(),
    setVideoFile: z.custom<Dispatch<SetStateAction<File | null>>>(),
    title: z.string().nullable(),
    setTitle: z.custom<Dispatch<SetStateAction<string | null>>>(),
    orderNumber: z.string().nullable(),
    setOrderNumber: z.custom<Dispatch<SetStateAction<string | null>>>(),
    allDescriptions: z.array(videoDescriptionsSchema).optional(),
    videoDescription: videoDescriptionsSchema.optional(),
    isLoadingDescriptions: z.boolean(),
    descriptionId: z.string().nullable(),
    setDescriptionId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    descriptionLabel: z.string().nullable(),
    setDescriptionLabel: z.custom<Dispatch<SetStateAction<string | null>>>(),
    descriptionMarkdown: z.string().nullable(),
    setDescriptionMarkdown: z.custom<Dispatch<SetStateAction<string | null>>>(),
});

export type ManageVideoState = z.infer<typeof manageVideoState>;

const ManageVideoContext = createContext<ManageVideoState | null>(null);

type AdminManageVideoProviderProps = {
    video: Video,
    children: ReactNode
}

export function ManageVideoProvider({video, children}: AdminManageVideoProviderProps) {

    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(video.title);
    const [orderNumber, setOrderNumber] = useState<string | null>(video.order_number.toString());
    const [descriptionId, setDescriptionId] = useState<string | null>(video.description_id);
    const [descriptionLabel, setDescriptionLabel] = useState<string | null>(null);
    const [descriptionMarkdown, setDescriptionMarkdown] = useState<string | null>(null);

    const {data: videoQuery, isLoading: isLoadingVideo} = useErrorQuery({
        queryFn: () => getVideoById(video.id),
        queryKey: ["video", video.id],
        enabled: !!video
    });

    const clientVideo = useMemo(() => {
        if (!videoQuery?.success) return;

        return videoQuery.value;
        // @ts-ignore
    }, [videoQuery?.value]);

    const {data: descriptionsQuery, isLoading: isLoadingDescriptions} = useErrorQuery({
        queryFn: () => getVideoDescriptions(),
        queryKey: ["descriptions"],
        enabled: !!clientVideo
    });

    const allDescriptions = useMemo(() => {
        if (!descriptionsQuery?.success) return;
        return descriptionsQuery.value;
        // @ts-ignore
    }, [descriptionsQuery?.value])

    const videoDescription = useMemo(() => {
        if (!allDescriptions || !clientVideo) return;

        return allDescriptions.find(d => d.id === descriptionId);
    }, [allDescriptions, descriptionId]);

    useEffect(() => {
        setHasChanges(
            !!videoFile ||
            title != clientVideo?.title ||
            !orderNumber || +orderNumber != clientVideo?.order_number ||
            descriptionId != clientVideo.description_id ||
            descriptionLabel != videoDescription?.label ||
            descriptionMarkdown != videoDescription?.markdown
        )
    }, [videoFile, title, orderNumber, descriptionId, descriptionLabel, descriptionMarkdown]);

    useEffect(() => {
        if (!editMode && clientVideo) {
            setTitle(clientVideo.title)
            setOrderNumber(clientVideo.order_number.toString());
            setDescriptionId(clientVideo?.description_id);
        }
    }, [editMode, clientVideo, videoDescription]);

    useEffect(() => {
        setDescriptionLabel(videoDescription?.label ?? null);
        setDescriptionMarkdown(videoDescription?.markdown ?? null);
    }, [videoDescription]);

    return <ManageVideoContext.Provider value={{
        video: clientVideo,
        isLoadingVideo,
        editMode, setEditMode,
        errors, setErrors,
        hasChanges,
        videoFile, setVideoFile,
        title, setTitle,
        orderNumber, setOrderNumber,
        allDescriptions, videoDescription, isLoadingDescriptions,
        descriptionId, setDescriptionId,
        descriptionLabel, setDescriptionLabel,
        descriptionMarkdown, setDescriptionMarkdown,
    }}>
        {children}
    </ManageVideoContext.Provider>
}

export function useManageVideo() {
    const context = useContext(ManageVideoContext);
    if (!context) {
        throw new Error("useManageVideo() must be used only inside ManageVideoProvider");
    }
    return context;
}