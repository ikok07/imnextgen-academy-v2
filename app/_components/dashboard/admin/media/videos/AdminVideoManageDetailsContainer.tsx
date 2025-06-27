"use client"

import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent} from "react";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import {Video} from "@/drizzle/schema/videos";
import AdminVideoManagePageProperties
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePageProperties";
import AdminVideoManagePlayer from "@/app/_components/dashboard/admin/media/videos/AdminVideoManagePlayer";
import { Skeleton } from "@/app/_components/ui/shadcn/skeleton";
import AdminVideoManageDetailsDescription
    from "@/app/_components/dashboard/admin/media/videos/AdminVideoManageDetailsDescription";
import {Section} from "@/drizzle/schema/sections";
import AdminVideoManageDetailsResourcesTable
    from "@/app/_components/dashboard/admin/media/videos/resources-table/AdminVideoManageDetailsResourcesTable";

type AdminVideoManageDetailsContainerProps = {
    sectionId: string,
    sectionsForModule: Section[]
}

export default function AdminVideoManageDetailsContainer({sectionId, sectionsForModule}: AdminVideoManageDetailsContainerProps) {
    const {
        video, isLoadingVideosForModule,
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
                isLoadingVideosForModule ? <Skeleton className="w-[40%] h-[1.4rem]" /> : <h1 className="text-xl font-extrabold">{video?.title}</h1>
            }

            <AdminVideoManagePageProperties sectionId={sectionId} sectionsForModule={sectionsForModule} />
            <AdminVideoManageDetailsDescription />
            <AdminVideoManageDetailsResourcesTable />
        </div>
    </div>
}