"use client"

import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useRouter} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";
import {useAdminManageModule} from "@/app/_providers/admin/AdminManageModuleProvider";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {updateModule} from "@/app/dashboard/admin/media/module/[moduleId]/actions";
import {z} from "zod";
import {moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

export default function AdminModuleManagePageHeaderButtons() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
        module,
        editMode,
        setEditMode,
        errors,
        hasChanges,
        newProfileImage,
        title,
        description,
        access,
        orderNumber,
        stripeProductId,
        nonDiscountedPriceId
    } = useAdminManageModule();

    const {mutate: updateModuleMethod, isLoading: isUpdatingModule} = useErrorMutation({
        mutationFn: async () => {
            return updateModule(
                module?.id,
                newProfileImage ? {
                    new: new Uint8Array(await newProfileImage.arrayBuffer()),
                    fileName: newProfileImage.name,
                    fileType: newProfileImage.type,
                    oldURI: module?.image_url ?? undefined
                } : undefined,
                {
                    title: title ?? undefined,
                    description: description ?? undefined,
                    access: (access as z.infer<typeof moduleAccessEnumSchema>) ?? undefined,
                    order_number: !orderNumber || isNaN(+orderNumber) ? undefined : +orderNumber,
                    stripe_product_id: stripeProductId ?? undefined,
                    non_discounted_price_id: nonDiscountedPriceId ?? undefined
                }
            )
        },
        onSuccess() {
            queryClient.refetchQueries(["module", module?.id]);
            setEditMode(false);
            toast.success("Модулът е обновен успешно!")
        }
    })

    function handleEnableEdit() {
        setEditMode(true);
    }

    function handleSaveChanges() {
        updateModuleMethod();
    }

    return <div className="flex items-center gap-2">
        {editMode ?
            <SecondaryButton onClick={() => setEditMode(false)}>Отказ</SecondaryButton>
            :
            <SecondaryButton onClick={() => router.push(Routes.dashboard.admin.media())}>Назад</SecondaryButton>
        }
        <PrimaryButton
            onClick={editMode ? handleSaveChanges : handleEnableEdit}
            loading={isUpdatingModule}
            disabled={editMode && (!hasChanges || errors.filter(v => !["stripeProductId", "nonDiscountedPriceId"].includes(v)).length > 0)}
        >
            {!editMode ? "Редактиране" : "Запазване"}
        </PrimaryButton>
    </div>
}