"use client"

import {IoClose, IoVideocam} from "react-icons/io5";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {FormEvent, useMemo, useState} from "react";
import AdminVideoCreateModalDescriptionFields
    from "@/app/_components/dashboard/admin/media/sections/videos-table/AdminVideoCreateModalDescriptionFields";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {Input} from "@/app/_components/ui/shadcn/input";
import SelfHostedVideoPlayer from "@/app/_components/ui/players/SelfHostedVideoPlayer";
import axios, {AxiosProgressEvent} from "axios";
import {useMutation} from "react-query";
import {getUploadVideoUrl} from "@/app/dashboard/admin/media/actions";
import {uploadVideo} from "@/app/dashboard/admin/media/section/[id]/action";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import {Video} from "@/drizzle/schema/videos";
import {Section} from "@/drizzle/schema/sections";

type AdminVideoCreateModalProps = {
    moduleId: string,
    sectionId: string,
    allSections: Section[],
    allVideos: Video[],
    onClose: () => void
}

async function uploadVideoFile(url: string, file: File, onUploadProgress: (e: AxiosProgressEvent) => void) {
    await axios.put(url, file, {
        headers: {"Content-Type": file.type},
        onUploadProgress
    });
}

export default function AdminVideoCreateModal({moduleId, sectionId, allSections, allVideos, onClose}: AdminVideoCreateModalProps) {
    const {userObject} = useAppUser();
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [descriptionId, setDescriptionId] = useState<string | null>(null);
    const [descriptionLabel, setDescriptionLabel] = useState<string | null>(null);
    const [descriptionMarkdown, setDescriptionMarkdown] = useState<string | null>(null);

    const [errors, setErrors] = useState<string[]>([]);

    const [uploadProgress, setUploadProgress] = useState(0);

    const validOrderNumbers = useMemo(() => {
        const currSection = allSections.find(s => s.id === sectionId)!;
        let currSectionOrderNumber = currSection.order_number;

        let nearestSectionVideos = allVideos.filter(v => v.section_id === sectionId);
        while (nearestSectionVideos.length === 0 && currSectionOrderNumber > 0) {
            const iteratedSection = allSections.find(s => s.order_number === --currSectionOrderNumber)!;
            nearestSectionVideos = allVideos.filter(v => v.section_id === iteratedSection.id);
        }

        if (nearestSectionVideos.length === 0) return [0];
        return nearestSectionVideos.map(v => v.order_number).concat(nearestSectionVideos[nearestSectionVideos.length - 1].order_number + 1)
    }, [allSections, allVideos, sectionId])

    const {mutate: uploadVideoMethod, isLoading: isUploadingVideoFile} = useMutation({
        mutationFn: async () => {
            if (!videoFile) return;
            const res = await getUploadVideoUrl();
            if (!res.success) throw new Error("Failed to create upload url!");
            // Upload video file to mux on the client side
            await uploadVideoFile(res.value.url, videoFile, (e) => {
                if (!e.total) return;
                setUploadProgress(Math.round((e.loaded * 100) / e.total));
            });
            // Database update
            await uploadVideo(moduleId, res.value.uploadId, userObject.user?.id, {
                title: title ?? undefined,
                section_id: sectionId,
                order_number: orderNumber ? +orderNumber : undefined,
                descriptionId: descriptionId != null && descriptionId != "new" ? descriptionId : undefined,
                descriptionLabel: descriptionLabel ?? undefined,
                descriptionMarkdown: descriptionMarkdown ?? undefined,
            });
        }
    });

    function buttonDisabled() {
        let errorsPredicate: boolean;
        if (descriptionId != null && descriptionId != "new") {
            errorsPredicate = errors.filter(v => v !== "descriptionTitle" && v !== "descriptionMarkdown").length > 0;
        } else {
            errorsPredicate = errors.length > 0;
        }
        return !videoFile || errorsPredicate;
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (buttonDisabled()) return;
        uploadVideoMethod();
    }

    return <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between pb-2 border-b border-border">
            <h4 className="text-lg">Създаване на видео</h4>
            <button onClick={onClose}><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></button>
        </div>
        <div className="grid gap-y-2 text-left mt-4">
            <Input
                type="file"
                accept=".mp4,.mpeg"
                id="video-upload"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (!file || !["video/mp4", "video/mpeg"].includes(file.type)) return;
                    setVideoFile(file);
                }}
            />
            {videoFile && <div className="flex flex-col items-center justify-center">
                <SelfHostedVideoPlayer url={URL.createObjectURL(videoFile)} />
                <button className="text-primary/70 text-sm font-bold mt-3 hover:text-cta transition-all duration-200" onClick={() => setVideoFile(null)}>Премахване</button>
            </div>}
            {!videoFile && <label htmlFor="video-upload">
                <div
                    className="cursor-pointer aspect-video rounded-lg overflow-hidden my-4 hover:opacity-70 transition-all duration-200">
                    <PrimaryErrorMessage
                        Icon={IoVideocam}
                        title="Качване на видео"
                        message="Натисни тук, за да качиш видеото"
                        className="border border-border h-full"
                        titleClassName="text-[1rem] xs:text-2xl"
                        descriptionClassName="text-[0.85rem] xs:text-sm"
                    />
                </div>
            </label>}
            <PrimaryInput
                label="Заглавие"
                placeholder="Секция..."
                value={title ?? ""}
                onChange={(e: any) => setTitle(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: title,
                    validateCb: () => z.string().min(1, {message: "Невалидно заглавие"}).parse(title),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                    errorId: "title"
                })}
            />
            <PrimarySelect
                label="Поредност"
                placeholder="Номер на видео"
                value={orderNumber ?? ""}
                onValueChange={v => setOrderNumber(v)}
                options={validOrderNumbers.map(number => ({value: number.toString()}))}
            />
            <AdminVideoCreateModalDescriptionFields
                descriptionId={descriptionId}
                setDescriptionId={setDescriptionId}
                descriptionTitle={descriptionLabel}
                setDescriptionTitle={setDescriptionLabel}
                descriptionMarkdown={descriptionMarkdown}
                setDescriptionMarkdown={setDescriptionMarkdown}
                errors={errors}
                setErrors={setErrors}
            />
        </div>
        <PrimaryButton
            className="w-full mt-4"
            type="submit"
            disabled={buttonDisabled()}
            loading={isUploadingVideoFile}
        >
            Създаване
        </PrimaryButton>
        {isUploadingVideoFile && <p className="text-center text-sm mt-2">Качване на видео: <span className="text-cta">{uploadProgress}%</span>
        </p>}
    </form>
}