"use client"

import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {moduleAccessEnum, moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {IoClose, IoCloudUpload} from "react-icons/io5";
import {useMemo, useState} from "react";
import {z} from "zod";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import { Input } from "@/app/_components/ui/shadcn/input";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {uploadModule} from "@/app/dashboard/admin/media/actions";
import { toast } from "sonner";
import {useQueryClient} from "react-query";

type AdminModulesTableCreateModuleModalProps = {
    onClose: () => void
}

export default function AdminModulesTableCreateModuleModal({onClose}: AdminModulesTableCreateModuleModalProps) {
    const queryClient = useQueryClient();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [accessLevel, setAccessLevel] = useState<z.infer<typeof moduleAccessEnumSchema> | null>(null);

    const [errors, setErrors] = useState<string[]>([]);

    const {mutate: uploadModuleMethod, isLoading: isUploadingModule} = useErrorMutation({
        mutationFn: async () => {
            const res = await uploadModule({
                imgFileBuffer: imageFile ? new Uint8Array(await imageFile.arrayBuffer()) : undefined,
                fileName: imageFile?.name,
                fileType: imageFile?.type,
                title,
                description,
                accessLevel
            });
            await queryClient.refetchQueries(["allModules"]);
            return res;
        },
        onSuccess() {
            toast.success("Модулът е създаден успешно!");
            onClose();
        },
        onError(e) {
            toast.error(e.id === "upload-failed" ? e.message : "Модулът не може да бъде създаден!");
        }
    });

    const buttonActive = useMemo(() => errors.length > 0 || !imageFile || !accessLevel, [errors.length, imageFile, accessLevel])

    return <div>
        <div className="flex items-center justify-between pb-2 border-b border-border">
            <h4 className="text-lg">Създаване на модул</h4>
            <button onClick={onClose}><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></button>
        </div>
        <Input
            type="file"
            id="image-upload"
            className="hidden"
            onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (!file || !["image/png", "image/jpeg", "image/webp"].includes(file.type)) return;
                setImageFile(file)
            }}
        />
        <label htmlFor="image-upload">
            <div className="cursor-pointer aspect-video rounded-lg my-4 hover:opacity-70 transition-all duration-200">
                {imageFile ?
                    <img src={URL.createObjectURL(imageFile)} alt={imageFile.name} className="w-full h-full object-cover" />
                    :
                    <PrimaryErrorMessage
                        Icon={IoCloudUpload}
                        title="Качване на снимка"
                        message="Натисни тук, за да качиш снимка на модула"
                        className="border border-border h-full"
                        titleClassName="text-[1rem] xs:text-2xl"
                        descriptionClassName="text-[0.85rem] xs:text-sm"
                    />}
            </div>
        </label>
        <div className="space-y-2 text-left">
            <PrimaryInput
                label="Заглавие"
                placeholder="Модул..."
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
            <PrimaryInput
                label="Описание"
                multiline={true}
                rows={5}
                value={description ?? ""}
                onChange={(e: any) => setDescription(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: description,
                    validateCb: () => z.string().min(1, {message: "Невалидно описание"}).parse(description),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                    errorId: "description"
                })}
                className="resize-none"
            />
            <PrimarySelect
                label="Ниво на достъп"
                defaultValue="free"
                placeholder="Достъп"
                onValueChange={v => setAccessLevel(v as z.infer<typeof moduleAccessEnumSchema>)}
                options={moduleAccessEnum.enumValues.map((value) => ({value}))}
            />
        </div>
        <PrimaryButton
            className="w-full mt-4"
            disabled={buttonActive}
            loading={isUploadingModule}
            onClick={() => uploadModuleMethod()}
        >
            Създаване
        </PrimaryButton>
    </div>
}