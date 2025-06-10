import {IGetUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/get-user-setup-questions.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUserSetupQuestionsController = ReturnType<typeof getUserSetupQuestionsController>;

export const getUserSetupQuestionsController = (
    getUserSetupQuestionsUseCase: IGetUserSetupQuestionsUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return getUserSetupQuestionsUseCase(userId);
}