import {IGetSetupQuestionsUseCase} from "@/src/application/use-cases/setup/get-setup-questions.use-case";

export type IGetSetupQuestionController = ReturnType<typeof getSetupQuestionsController>;

export const getSetupQuestionsController = (
    getSetupQuestionsUseCase: IGetSetupQuestionsUseCase
) => async () => {
    return getSetupQuestionsUseCase();
}