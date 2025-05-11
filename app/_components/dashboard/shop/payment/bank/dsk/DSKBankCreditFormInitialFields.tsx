"use client"

import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState} from "react";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";

type DskBankCreditFormInitialFieldsProps = {
    setDebouncedInitialPayment: Dispatch<SetStateAction<string | null>>,
    setDebouncedPeriodString: Dispatch<SetStateAction<string | null>>,
    errors: string[],
    setErrors: Dispatch<SetStateAction<string[]>>
    isLoading: boolean,
    maxInitialPayment: number | undefined
}

export default function DskBankCreditFormInitialFields({setDebouncedInitialPayment, setDebouncedPeriodString, errors, setErrors, isLoading, maxInitialPayment}: DskBankCreditFormInitialFieldsProps) {
    const [initialPayment, setInitialPayment] = useState<string | null>(null);
    const [periodString, setPeriodString] = useState<string | null>(null);

    const initialPaymentSchema = useMemo(() => {
        const baseSchema = z.coerce.number({message: "Моля, въведете валидна вноска"}).min(0, {message: "Вноската трябва да е по-голяма или равна на 0"});
        if (maxInitialPayment) return baseSchema.max(maxInitialPayment, {message: "Вноската надвишава главницата!"});
       return baseSchema;
    }, [maxInitialPayment])

    useEffect(() => {
        setDebouncedInitialPayment(initialPayment);
    }, [initialPayment]);

    useEffect(() => {
        setDebouncedPeriodString(periodString);
    }, [periodString]);

    return <>
        <PrimaryInput
            disabled={isLoading}
            label="Първоначална вноска (лв)"
            placeholder="200"
            value={initialPayment ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInitialPayment(e.target.value)}
            error={handleParse({
                type: "ignoreNull",
                value: initialPayment,
                validateCb: () => initialPaymentSchema.parse(initialPayment).toString(),
                trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                errorId: "initialPayment"
            })}
        />
        <PrimaryInput
            disabled={isLoading}
            label="Период (месеци)"
            placeholder="Между 3 и 48 месеца"
            value={periodString ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPeriodString(e.target.value)}
            error={handleParse({
                type: "ignoreNull",
                value: periodString,
                validateCb: () => z.coerce.number({message: "Моля, въведете валиден период"}).min(3, {message: "Периодът трябва да е по-голям или равен на 3 месеца"}).max(48, {message: "Периодът трябва да е по-малък или равен на 48 месеца"}).parse(periodString).toString(),
                trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                errorId: "periodString"
            })}
        />
    </>
}