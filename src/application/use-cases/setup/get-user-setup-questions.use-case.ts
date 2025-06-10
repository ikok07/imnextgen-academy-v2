import {ISetupQuestionsRepository} from "@/src/application/repositories/setup/setup-questions.repository.interface";

export type IGetUserSetupQuestionsUseCase = ReturnType<typeof getUserSetupQuestionsUseCase>;

export const getUserSetupQuestionsUseCase = (
    setupQuestionsRepository: ISetupQuestionsRepository
) => async (userId: string) => {
    return setupQuestionsRepository.getUserSetupQuestions(userId);
}