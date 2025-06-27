"use client"

import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent} from "react";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import DashboardModuleVideoDescription
    from "@/app/_components/dashboard/classroom/module/video/DashboardModuleVideoDescription";
import {useManageVideo} from "@/app/_providers/admin/AdminManageVideoProvider";

export default function AdminVideoManageDetailsDescription() {
    const {
        isLoadingVideosForModule,
        editMode,
        allDescriptions, videoDescription, isLoadingDescriptions,
        descriptionId, setDescriptionId,
        descriptionLabel, setDescriptionLabel,
        descriptionMarkdown, setDescriptionMarkdown
    } = useManageVideo();

    return <>
        <h4 className="my-3 text-lg font-semibold">Описание</h4>
        {editMode ?
            <div className="flex flex-col gap-4">
                <PrimarySelect
                    placeholder="Шаблон"
                    value={descriptionId ?? ""}
                    onValueChange={v => setDescriptionId(v)}
                    options={[{label: "Нов шаблон", value: "new"}, ...allDescriptions?.map(d => ({label: d.label, value: d.id})) ?? []]}
                />
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
            isLoadingVideosForModule || isLoadingDescriptions ?
                <div className="space-y-2">
                    <Skeleton className="w-full h-[0.7rem]" />
                    <Skeleton className="w-full h-[0.7rem]" />
                    <Skeleton className="w-[30%] h-[0.7rem]" />
                </div>
                :
                <DashboardModuleVideoDescription description={videoDescription?.markdown ?? ""} />
        }
    </>
}