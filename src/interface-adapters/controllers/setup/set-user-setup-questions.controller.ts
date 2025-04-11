import {ISetUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/set-user-setup-questions.use-case";
import {UserSetupQuestionInsert, userSetupQuestionInsertSchema} from "@/drizzle/schema/user_setup_questions";
import {InputParseError} from "@/src/entities/errors/common";
import {z} from "zod";

export type ISetUserSetupQuestionsController = ReturnType<typeof setUserSetupQuestionsController>;

export const setUserSetupQuestionsController = (
    setUserSetupQuestionsUseCase: ISetUserSetupQuestionsUseCase
) => async (userId: string | undefined, answers: Partial<UserSetupQuestionInsert>[]) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    const {data: parsedAnswers, error: answersError} = z.array(userSetupQuestionInsertSchema).safeParse(answers);
    if (answersError) throw new InputParseError("Invalid answers!");

    return setUserSetupQuestionsUseCase(userId, parsedAnswers)
}