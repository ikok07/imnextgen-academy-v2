"use client"

import {IoClose} from "react-icons/io5";
import {FormEvent, useMemo, useState} from "react";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {createSection} from "@/app/dashboard/admin/media/module/[moduleId]/actions";
import {toast} from "sonner";
import {useQueryClient} from "react-query";

type AdminSectionCreateModalProps = {
    moduleId: string,
    onClose: () => void
}

export default function AdminSectionCreateModal({moduleId, onClose}: AdminSectionCreateModalProps) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);

    const {mutate: createSectionMethod, isLoading: isCreatingSection} = useErrorMutation({
        mutationFn: async () => {
            const res = await createSection(
                {
                    title: title ?? undefined,
                    module_id: moduleId
                }
            )

            await queryClient.refetchQueries(["allSections", moduleId]);
            return res;
        },
        onSuccess() {
            toast.success("Секцията е създадена успешно!");
            onClose();
        },
        onError() {
            toast.error("Секцията не може да бъде създадена!");
        }
    });

    const buttonDisabled = useMemo(() => errors.length > 0, [errors.length]);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (buttonDisabled) return;
        createSectionMethod();
    }

    return <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between pb-2 border-b border-border">
            <h4 className="text-lg">Създаване на секция</h4>
            <button onClick={onClose}><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></button>
        </div>
        <div className="space-y-2 text-left mt-4">
            <PrimaryInput
                label="Заглавие"
                placeholder="Секция..."
                value={title ?? ""}
                onChange={(e: any) => setTitle(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: title,
                    validateCb: () => z.string().min(1, {message: "Невалидно заглавие"}).parse(title),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                    errorId: "title"
                })}
            />
        </div>
        <PrimaryButton
            className="w-full mt-4"
            type="submit"
            disabled={buttonDisabled}
            loading={isCreatingSection}
        >
            Създаване
        </PrimaryButton>
    </form>
}