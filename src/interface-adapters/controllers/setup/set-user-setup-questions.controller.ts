import {ISetUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/set-user-setup-questions.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {z} from "zod";
import {UserSetupAnswer, userSetupAnswers} from "@/src/entities/setup/user-setup-answers";

export type ISetUserSetupQuestionsController = ReturnType<typeof setUserSetupQuestionsController>;

export const setUserSetupQuestionsController = (
    setUserSetupQuestionsUseCase: ISetUserSetupQuestionsUseCase
) => async (userId: string | undefined, answers: UserSetupAnswer[]) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    const {data: parsedAnswers, error: answersError} = z.array(userSetupAnswers).safeParse(answers);
    if (answersError) throw new InputParseError("Invalid answers!");

    return setUserSetupQuestionsUseCase(userId, parsedAnswers);
}