"use client"

import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import {useState} from "react";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import axios, {AxiosProgressEvent} from "axios";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {updateVideo} from "@/app/dashboard/admin/media/module/[moduleId]/section/[sectionId]/video/[videoId]/actions";
import {getUploadVideoUrl} from "@/app/dashboard/admin/media/actions";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import {LoadingSpinner} from "@/app/_components/ui/shadcn/loading-spinner";
import {toast} from "sonner";

type AdminVideoManagePageHeaderButtonsProps = {
    moduleId: string,
    sectionId: string
}

async function uploadVideoFile(url: string, file: File, onUploadProgress: (e: AxiosProgressEvent) => void) {
    await axios.put(url, file, {
        headers: {"Content-Type": file.type},
        onUploadProgress
    });
}

export default function AdminVideoManagePageHeaderButtons({moduleId, sectionId}: AdminVideoManagePageHeaderButtonsProps) {
    const {userObject} = useAppUser();
    const router = useRouter();
    const queryClient = useQueryClient();

    const {video, editMode, setEditMode, hasChanges, errors, videoFile, title, orderNumber, descriptionId, descriptionLabel, descriptionMarkdown} = useManageVideo();
    const [uploadProgress, setUploadProgress] = useState(0);

    const {mutate: updateVideoMethod, isLoading: isUpdatingVideo} = useErrorMutation({
        mutationFn: async () => {
            let uploadId: string | undefined;
            if (videoFile) {
                const res = await getUploadVideoUrl();
                if (!res.success) throw new Error("Failed to create upload url!");
                uploadId = res.value.uploadId;
                await uploadVideoFile(res.value.url, videoFile, (e) => {
                    if (!e.total) return;
                    setUploadProgress(Math.round((e.loaded * 100) / e.total));
                });
            }
            const res = await updateVideo(
                uploadId,
                userObject.user?.id,
                moduleId,
                video?.id,
                {
                    title: title ?? undefined,
                    order_number: orderNumber && !isNaN(+orderNumber) ? +orderNumber : undefined,
                    description_id: descriptionId === "new" ? undefined : (descriptionId ?? undefined),
                    descriptionLabel: descriptionLabel ?? undefined,
                    descriptionMarkdown: descriptionMarkdown ?? undefined
                }
            )

            await queryClient.refetchQueries(["video", video?.id]);
            await queryClient.refetchQueries(["description", video?.id]);

            return res;
        },
        onSuccess() {
            setEditMode(false);
            toast.success("Видеото е успешно обновено");
        },
        onError() {
            toast.error("Видеото не може да бъде обновено!");
        }
    })

    function handleSaveChanges() {
        updateVideoMethod();
    }

    function handleEnableEdit() {
        setEditMode(true);
    }

    return <div className="flex items-center gap-2">
        {editMode ?
            <SecondaryButton onClick={() => setEditMode(false)}>Отказ</SecondaryButton>
            :
            <SecondaryButton onClick={() => router.push(Routes.dashboard.admin.section(moduleId, sectionId))}>Назад</SecondaryButton>
        }
        {isUpdatingVideo ?
            <div className="flex items-center gap-2 text-sm animate-in slide-in-from-bottom-2 fade-in duration-200">
                <LoadingSpinner className="text-cta" />
                <p>Качване: {uploadProgress}%</p>
            </div>
            :
            <PrimaryButton
                onClick={editMode ? handleSaveChanges : handleEnableEdit}
                disabled={editMode && (!hasChanges || errors.length > 0)}
            >
                {!editMode ? "Редактиране" : "Запазване"}
            </PrimaryButton>
        }
    </div>
}