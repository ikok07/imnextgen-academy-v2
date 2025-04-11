import {ISetupQuestionsRepository} from "@/src/application/repositories/setup-questions.repository.interface";

export type IGetSetupQuestionsUseCase = ReturnType<typeof getSetupQuestionsUseCase>;

export const getSetupQuestionsUseCase = (
    setupQuestionsRepository: ISetupQuestionsRepository
) => async () => {
    return setupQuestionsRepository.getSetupQuestions();
}