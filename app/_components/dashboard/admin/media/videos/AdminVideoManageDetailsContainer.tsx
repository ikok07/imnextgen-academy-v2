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
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import { Skeleton } from "@/app/_components/ui/shadcn/skeleton";
import AdminVideoManageDetailsDescription
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageDetailsDescription";

type AdminVideoManageDetailsContainerProps = {
    allVideos: Video[]
}

// DONE: 1. Add loading skeletons
// DONE: 2. Implement update functionality
// TODO: 3. Configure access policies

export default function AdminVideoManageDetailsContainer({allVideos}: AdminVideoManageDetailsContainerProps) {
    const {
        video, isLoadingVideo,
        editMode,
        errors,
        setErrors,
        title, setTitle
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
                isLoadingVideo ? <Skeleton className="w-[40%] h-[1.4rem]" /> : <h1 className="text-xl font-extrabold">{video?.title}</h1>
            }

            <AdminVideoManagePageProperties allVideos={allVideos} />
            <AdminVideoManageDetailsDescription />
        </div>
    </div>
}