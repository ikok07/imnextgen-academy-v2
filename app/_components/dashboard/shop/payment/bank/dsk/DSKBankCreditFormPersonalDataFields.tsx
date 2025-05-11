"use client"

import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";

type DskBankCreditFormPersonalDataFieldsProps = {
    isLoading: boolean,
    errors: string[],
    setErrors: Dispatch<SetStateAction<string[]>>,
    address: string | null,
    setAddress: Dispatch<SetStateAction<string | null>>,
    personalId: string | null,
    setPersonalId: Dispatch<SetStateAction<string | null>>,
    city: string | null,
    setCity: Dispatch<SetStateAction<string | null>>,
    zipCode: string | null,
    setZipCode: Dispatch<SetStateAction<string | null>>,
}

export default function DskBankCreditFormPersonalDataFields(props: DskBankCreditFormPersonalDataFieldsProps) {
    return <>
        <PrimaryInput
            disabled={props.isLoading}
            label="Адрес"
            placeholder="Улица"
            value={props.address ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setAddress(e.target.value)}
            error={handleParse({
                type: "ignoreNull",
                value: props.address,
                validateCb: () => z.string().min(3, {message: "Невалиден адрес"}).parse(props.address),
                trackErrorsFunc: (id, action) => trackErrors(id, action, props.errors, props.setErrors),
                errorId: "address"
            })}
        />
        <PrimaryInput
            disabled={props.isLoading}
            label="ЕГН"
            placeholder="ХХХ..."
            value={props.personalId ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => props.setPersonalId(e.target.value)}
            error={handleParse({
                type: "ignoreNull",
                value: props.personalId,
                validateCb: () => z.string().length(10, {message: "Невалидно ЕГН"}).parse(props.personalId),
                trackErrorsFunc: (id, action) => trackErrors(id, action, props.errors, props.setErrors),
                errorId: "personalId"
            })}
        />
        <div className="grid xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
            <PrimaryInput
                disabled={props.isLoading}
                label="Населено място"
                placeholder="Град / Село"
                value={props.city ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setCity(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: props.city,
                    validateCb: () => z.string().min(3, {message: "Невалидно населено място"}).parse(props.city),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, props.errors, props.setErrors),
                    errorId: "city"
                })}
            />
            <PrimaryInput
                disabled={props.isLoading}
                label="Пощенски код"
                placeholder="ХХХХ"
                value={props.zipCode ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setZipCode(e.target.value)}
                error={handleParse({
                    type: "ignoreNull",
                    value: props.zipCode,
                    validateCb: () => z.string().min(3, {message: "Невалиден пощенски код"}).parse(props.zipCode),
                    trackErrorsFunc: (id, action) => trackErrors(id, action, props.errors, props.setErrors),
                    errorId: "zipCode"
                })}
            />
        </div>
    </>
}