"use client"

import {SetupQuestion} from "@/drizzle/schema/setup_questions";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {ChangeEvent, useState} from "react";
import {z} from "zod";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import {useRouter} from "next/navigation";

type SetupFormProps = {
    setupQuestions: SetupQuestion[]
}

export default function SetupForm({setupQuestions}: SetupFormProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const [answers, setAnswers] = useState<{id: string, text: string | null}[]>(setupQuestions.map(q => ({id: q.id, text: null})));
    const router = useRouter();

    return <>
        <div className="space-y-4">
            {setupQuestions.map((question, index) => {
                const answerIndex = answers.findIndex(a => a.id === question.id);
                const answerFound = answerIndex != -1;

                if (!answerFound) return;

                return <PrimaryInput
                    key={index}
                    label={question.question}
                    placeholder="Question 1"
                    value={answers[answerIndex].text ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAnswers(v => [{id: answers[answerIndex].id, text: e.target.value}, ...(v.filter(a => a.id !== question.id))])
                    }}
                    multiline={question.is_multiline}
                    required={question.required}
                    error={
                        handleParse({
                            type: "ignoreNull",
                            value: answers[answerIndex].text,
                            validateCb: question.required ? () => z.string().min(1, "Полето е задължително").parse(answers[answerIndex].text) : () => "",
                            trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                            errorId: question.question,
                        })
                    }
                />
            })}
        </div>
        <PrimaryButton
            className="mt-10"
            disabled={errors.length > 0}
        >
            Потвърждаване
        </PrimaryButton>
    </>
}