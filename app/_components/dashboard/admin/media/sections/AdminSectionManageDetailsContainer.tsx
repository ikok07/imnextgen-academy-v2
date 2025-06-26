"use client"

import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent} from "react";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import {useManageSection} from "@/app/_providers/admin/AdminManageSectionProvider";
import {IoListOutline} from "react-icons/io5";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import AdminMediaItemPropertyBox from "@/app/_components/dashboard/admin/media/AdminMediaItemPropertyBox";
import {Section} from "@/drizzle/schema/sections";

type AdminSectionManageDetailsContainerProps = {
    allSections: Section[]
}

export default function AdminSectionManageDetailsContainer({allSections}: AdminSectionManageDetailsContainerProps) {
    const {editMode, title, setTitle, orderNumber, setOrderNumber, errors, setErrors} = useManageSection();

    return <div className="mt-2">
        {editMode ?
            <PrimaryInput
                placeholder="Модул..."
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
            <h1 className="text-xl font-extrabold">{title}</h1>
        }
        <div className="mt-4">
            <AdminMediaItemPropertyBox
                Icon={IoListOutline}
                label="Поредност"
                value={`№ ${orderNumber}`}
                valueContent={
                    editMode ? <PrimarySelect
                        className="max-w-full md:max-w-[10rem]"
                        placeholder="Поредност"
                        value={orderNumber ?? ""}
                        onValueChange={v => setOrderNumber(v)}
                        options={Array.from({length: allSections.length}).map((_, index) => ({label: index.toString(), value: index.toString()}))}
                    /> : undefined
                }
            />
        </div>
    </div>
}