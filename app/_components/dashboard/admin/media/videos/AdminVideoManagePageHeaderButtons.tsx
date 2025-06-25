"use client"

import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import {useState} from "react";

type AdminVideoManagePageHeaderButtonsProps = {
    moduleId: string,
    sectionId: string
}

export default function AdminVideoManagePageHeaderButtons({moduleId, sectionId}: AdminVideoManagePageHeaderButtonsProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [editMode, setEditMode] = useState(false);

    function handleSaveChanges() {
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
        <PrimaryButton
            onClick={editMode ? handleSaveChanges : handleEnableEdit}
            loading={false}
            disabled={editMode}
        >
            {!editMode ? "Редактиране" : "Запазване"}
        </PrimaryButton>
    </div>
}