"use client"

import {IoClose} from "react-icons/io5";
import {Input} from "@/app/_components/ui/shadcn/input";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {FormEvent, useState} from "react";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import {toast} from "sonner";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {
    uploadResource
} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/video/[videoId]/actions";
import {useQueryClient} from "react-query";
import {getUploadFileLink} from "@/app/actions";
import axios, {AxiosProgressEvent} from "axios";
import {Progress} from "@/app/_components/ui/shadcn/progress";

type AdminResourceCreateModalProps = {
    onClose: () => void
}

async function uploadFile(uploadUrl: string, file: File, onUploadProgress: (e: AxiosProgressEvent) => void) {
    await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": file.type
        },
        onUploadProgress
    });
}

export default function AdminResourceCreateModal({onClose}: AdminResourceCreateModalProps) {
    const queryClient = useQueryClient();
    const {module, video} = useManageVideo();
    const [file, setFile] = useState<File | undefined>();
    const [label, setLabel] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const [uploadProgress, setUploadProgress] = useState(0);

    const {mutate: uploadResourceMethod, isLoading: isUploadingResource} = useErrorMutation({
        mutationFn: async () => {
            if (!file) throw new Error("File not found!");
            console.log({
                bucket: process.env.NEXT_PUBLIC_R2_VIDEO_RESOURCES_BUCKET!,
                key: file?.name,
                contentType: file?.type,
                expiresInSeconds: 60 * 10
            })
            const uploadUrlResult = await getUploadFileLink({
                bucket: process.env.NEXT_PUBLIC_R2_VIDEO_RESOURCES_BUCKET!,
                key: file?.name,
                contentType: file?.type,
                expiresInSeconds: 60 * 10
            });

            if (!uploadUrlResult.success) throw new Error("Upload link not generated!");
            console.log(uploadUrlResult.value);
            await uploadFile(uploadUrlResult.value, file, (e) => {
                setUploadProgress(Math.round((e.loaded * 100) / (e.total || 1)));
            });

            const res = await uploadResource({
                label: label ?? undefined,
                type: "file",
                video_id: video?.id,
                url: `/api/v1/assets?bucket=${process.env.R2_VIDEO_RESOURCES_BUCKET!}&path=${file?.name}`
            });
            await queryClient.refetchQueries(["videos", module.id]);
            return res;
        },
        onError() {
            toast.error("Ресурсът не беше създаден. Моля, опитай отново!");
        },
        onSuccess() {
            toast.success("Ресурсът е успешно създаден!");
            onClose();
        }
    })

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        uploadResourceMethod();
    }

    return <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between pb-2 border-b border-border">
            <h4 className="text-lg">Създаване на ресурс</h4>
            <button onClick={onClose}><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></button>
        </div>
        <div className="grid gap-y-2 text-left mt-4">
            <Input
                type="file"
                onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (!file) return;
                    if (file.size <= 100_000_000) setFile(file);
                    else toast.error("Файлът не може да бъде по-голям от 100MB!");
                }}
            />
            <PrimaryInput
                label="Име"
                placeholder="Ресурс..."
                value={label ?? ""}
                onChange={(e: any) => setLabel(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: label,
                    validateCb: () => z.string().min(1, {message: "Невалидно име"}).parse(label),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                    errorId: "label"
                })}
            />
        </div>

        {isUploadingResource ?
            <div className="grid gap-2 mt-4 animate-in slide-in-from-bottom-2 fade-in duration-200 transition-all">
                <div className="flex items-center justify-between">
                    <p className="text-sm">Ресурсът се качва...</p>
                    <p className="text-sm font-bold text-cta dark:text-primary">{uploadProgress}%</p>
                </div>
                <Progress value={uploadProgress} sliderClassName="bg-cta dark:bg-primary" />
            </div>
            :
            <PrimaryButton
                className="w-full mt-4 animate-out slide-out-to-top-2 fade-out duration-200 transition-all"
                type="submit"
                disabled={errors.length > 0 && !!file}
                loading={isUploadingResource}
            >
                Създаване
            </PrimaryButton>
        }
    </form>
}