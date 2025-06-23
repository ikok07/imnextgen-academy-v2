"use client"

import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useRouter} from "next/navigation";
import {useManageSection} from "@/app/_providers/admin/AdminManageSectionProvider";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {updateSection} from "@/app/dashboard/admin/media/section/[id]/action";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

type AdminSectionManagePageHeaderButtonsProps = {
    moduleId: string,
    sectionId: string
}

export default function AdminSectionManagePageHeaderButtons({moduleId, sectionId}: AdminSectionManagePageHeaderButtonsProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {editMode, setEditMode, errors, hasChanges, title, orderNumber} = useManageSection();

    const {mutate: updateSectionMethod, isLoading: isUpdatingSection} = useErrorMutation({
        mutationFn: async () => {
            const res = await updateSection(sectionId, moduleId, {
                title: title ?? undefined,
                order_number: orderNumber ? +orderNumber : undefined
            });
            await queryClient.refetchQueries(["section", sectionId]);
            return res;
        },
        onSuccess() {
            toast.success("Секцията е успешно обновена!");
            setEditMode(false);
        },
        onError() {
            toast.error("Секцията не може да бъде обновена!");
        }
    })

    function handleSaveChanges() {
        updateSectionMethod()
    }

    function handleEnableEdit() {
        setEditMode(true);
    }

    return <div className="flex items-center gap-2">
        {editMode ?
            <SecondaryButton onClick={() => setEditMode(false)}>Отказ</SecondaryButton>
            :
            <SecondaryButton onClick={() => router.push(Routes.dashboard.admin.module(moduleId))}>Назад</SecondaryButton>
        }
        <PrimaryButton
            onClick={editMode ? handleSaveChanges : handleEnableEdit}
            loading={isUpdatingSection}
            disabled={editMode && (!hasChanges || errors.length > 0)}
        >
            {!editMode ? "Редактиране" : "Запазване"}
        </PrimaryButton>
    </div>
}