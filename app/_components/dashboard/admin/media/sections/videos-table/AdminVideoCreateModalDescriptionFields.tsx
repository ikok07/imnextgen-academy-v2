"use client"

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/app/_components/ui/shadcn/tooltip";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";
import {Dispatch, SetStateAction, useMemo} from "react";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getVideoDescriptions} from "@/app/dashboard/admin/media/actions";
import {toast} from "sonner";

type AdminVideoCreateModalDescriptionFieldsProps = {
    descriptionId: string | null,
    setDescriptionId: Dispatch<SetStateAction<string | null>>,
    descriptionTitle: string | null,
    setDescriptionTitle: Dispatch<SetStateAction<string | null>>,
    descriptionMarkdown: string | null,
    setDescriptionMarkdown: Dispatch<SetStateAction<string | null>>,
    errors: string[],
    setErrors: Dispatch<SetStateAction<string[]>>,
}

export default function AdminVideoCreateModalDescriptionFields({descriptionId, setDescriptionId, descriptionTitle, setDescriptionTitle, descriptionMarkdown, setDescriptionMarkdown, errors, setErrors}: AdminVideoCreateModalDescriptionFieldsProps) {
    const {data: videoDescriptionsQuery, isLoading: isLoadingVideoDescriptions} = useErrorQuery({
        queryFn: () => getVideoDescriptions(),
        queryKey: ["videoDescriptions"],
        onError() {
            toast.error("Шаблоните на описанията не можаха да бъдат заредени!")
        }
    });

    const videoDescriptions = useMemo(() => {
        if (!videoDescriptionsQuery?.success || isLoadingVideoDescriptions) return [];
        return videoDescriptionsQuery.value.sort();
        // @ts-ignore
    }, [videoDescriptionsQuery?.value]);

    return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <PrimarySelect
                        label="Шаблон на описание"
                        placeholder="Нов шаблон"
                        value={descriptionId ?? ""}
                        onValueChange={v => setDescriptionId(v)}
                        options={[{label: "Нов шаблон", value: "new"}, ...videoDescriptions.map(d => ({label: d.label, value: d.id}))]}
                        className="w-full text-left"
                    />
                </TooltipTrigger>
                {isLoadingVideoDescriptions && <TooltipContent>
                    <p>Данните се зареждат...</p>
                </TooltipContent>}
            </Tooltip>
        </TooltipProvider>
        {(!descriptionId || descriptionId === "new") &&
            <>
                <PrimaryInput
                    label="Име на описание"
                    placeholder="Описание..."
                    value={descriptionTitle ?? ""}
                    onChange={(e: any) => setDescriptionTitle(e.target.value)}
                    error={handleParse({
                        type: "ignoreNull",
                        value: descriptionTitle,
                        validateCb: () => z.string().min(1, {message: "Невалидно име"}).parse(descriptionTitle),
                        trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                        errorId: "descriptionTitle"
                    })}
                />
                <PrimaryInput
                    label="Описание (markdown)"
                    placeholder="# Заглавие..."
                    value={descriptionMarkdown ?? ""}
                    onChange={(e: any) => setDescriptionMarkdown(e.target.value)}
                    multiline={true}
                    rows={5}
                    error={handleParse({
                        type: "ignoreNull",
                        value: descriptionMarkdown,
                        validateCb: () => z.string().min(1, {message: "Невалидно описание"}).parse(descriptionMarkdown),
                        trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                        errorId: "descriptionMarkdown"
                    })}
                    className="resize-none"
                />
            </>
        }
    </>
}