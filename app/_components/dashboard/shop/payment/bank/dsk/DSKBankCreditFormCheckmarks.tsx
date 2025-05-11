"use client"

import PrimaryCheckbox from "@/app/_components/ui/checkboxes/PrimaryCheckbox";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

type DskBankCreditFormCheckmarksProps = {
    checkedOptions: Set<string>,
    setCheckedOptions: Dispatch<SetStateAction<Set<string>>>
}

export default function DskBankCreditFormCheckmarks({checkedOptions, setCheckedOptions}: DskBankCreditFormCheckmarksProps) {
    return <div className="space-y-3">
        <PrimaryCheckbox
            label={<>Съгласявам се с <a target="_blank" href={process.env.NEXT_PUBLIC_DSK_CONTRACT_TERMS_URL!}>условията</a> за сключване на договор от разстояние</>}
            checked={checkedOptions.has("contract-terms-url")}
            onClick={() => setCheckedOptions(v => {
                const id = "contract-terms-url";
                console.log(v);
                if (checkedOptions.has(id)) {
                    return new Set(v.values().toArray().filter(item => item != id));
                } else {
                    return new Set([...v.values().toArray(), id]);
                }
            })}
            boxClassName="mt-4"
        />
        <PrimaryCheckbox
            label={<>Съгласявам се с <a target="_blank" href={process.env.NEXT_PUBLIC_DSK_LOAN_TERMS_URL!}>условията</a> условията за стоков кредит на банка ДСК</>}
            checked={checkedOptions.has("loan-terms-url")}
            onClick={() => setCheckedOptions(v => {
                const id = "loan-terms-url";
                console.log(v);
                if (checkedOptions.has(id)) {
                    return new Set(v.values().toArray().filter(item => item != id));
                } else {
                    return new Set([...v.values().toArray(), id]);
                }
            })}
            boxClassName="mt-4"
        />
        <PrimaryCheckbox
            label={<>Съгласявам се с <a target="_blank" href={process.env.NEXT_PUBLIC_DSK_PERSONAL_DATA_URL!}>информацията</a> относно обработването на личните ми данни</>}
            checked={checkedOptions.has("personal-data-url")}
            onClick={() => setCheckedOptions(v => {
                const id = "personal-data-url";
                console.log(v);
                if (checkedOptions.has(id)) {
                    return new Set(v.values().toArray().filter(item => item != id));
                } else {
                    return new Set([...v.values().toArray(), id]);
                }
            })}
            boxClassName="mt-4"
        />
    </div>
}