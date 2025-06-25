"use client"

import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent} from "react";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import {Video} from "@/drizzle/schema/videos";
import AdminVideoManagePageProperties
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePageProperties";
import DashboardModuleVideoDescription
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoDescription";
import AdminVideoManagePlayer from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePlayer";

type AdminVideoManageDetailsContainerProps = {
    allVideos: Video[]
}

// TODO: 1. Add loading skeletons
// TODO: 2. Implement update functionality
// TODO: 3. Configure access policies

export default function AdminVideoManageDetailsContainer({allVideos}: AdminVideoManageDetailsContainerProps) {
    const {
        video,
        editMode,
        errors,
        setErrors,
        videoFile, setVideoFile,
        title, setTitle,
        videoDescription,
        descriptionLabel, setDescriptionLabel,
        descriptionMarkdown, setDescriptionMarkdown
    } = useManageVideo();


    return <div className="grid gap-4 mt-4">
        <AdminVideoManagePlayer />
        <div>
            {editMode ?
                <PrimaryInput
                    placeholder="Видео..."
                    label="Заглавие"
                    value={title ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    error={handleParse({
                        type: "ignoreNull",
                        value: title,
                        validateCb: () => z.string().min(3, {message: "Минимум 3 символа"}).parse(title),
                        trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                        errorId: "title"
                    })}
                />
                :
                <h1 className="text-xl font-extrabold">{video?.title}</h1>
            }

            <AdminVideoManagePageProperties allVideos={allVideos} />

            <h4 className="my-3 text-lg font-semibold">Описание</h4>
            {editMode ?
                <div className="flex flex-col gap-4">
                    <PrimaryInput
                        label="Име на шаблон"
                        placeholder="Шаблон 1"
                        value={descriptionLabel ?? videoDescription?.label ?? ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionLabel(e.target.value)}
                    />
                    <PrimaryInput
                        label="Шаблон"
                        placeholder="# Заглавие..."
                        multiline={true}
                        rows={7}
                        value={descriptionMarkdown ?? videoDescription?.markdown ?? ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionMarkdown(e.target.value)}
                        className="resize-none"
                    />
                </div>
                :
                <DashboardModuleVideoDescription description={videoDescription?.markdown ?? ""}/>
            }
        </div>
    </div>
}