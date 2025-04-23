"use client"

import {SetupQuestion} from "@/drizzle/schema/setup_questions";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {ChangeEvent, useState} from "react";
import {z} from "zod";
import PrimaryButton from "../../ui/buttons/PrimaryButton";
import {useRouter} from "next/navigation";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {setUserSetupQuestions} from "@/app/account/setup/actions";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import { UserSetupAnswer } from "@/src/entities/setup/user-setup-answers";
import {Routes} from "@/app/_utils/nav/routes";

type SetupFormProps = {
    setupQuestions: SetupQuestion[]
}

export default function SetupForm({setupQuestions}: SetupFormProps) {
    const [errors, setErrors] = useState<string[]>([]);
    const [answers, setAnswers] = useState<UserSetupAnswer[]>(setupQuestions.map(q => ({id: q.id, text: null})));
    const {userObject} = useAppUser();
    const router = useRouter();

    const {mutate: setUserSetupQuestionsMethod, isLoading} = useErrorMutation({
        mutationFn: () => setUserSetupQuestions(userObject.user?.id, answers),
        onSuccess() {
            router.push(Routes.dashboard.classroom.base);
        }
    })

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
            loading={isLoading}
            onClick={() => setUserSetupQuestionsMethod()}
        >
            Потвърждаване
        </PrimaryButton>
    </>
}