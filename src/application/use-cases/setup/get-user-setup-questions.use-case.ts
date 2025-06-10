import {ISetupQuestionsRepository} from "@/src/application/repositories/setup/setup-questions.repository.interface";
import {FullUserSetupQuestion} from "@/src/entities/models/setup/full-user-setup-question";

export type IGetUserSetupQuestionsUseCase = ReturnType<typeof getUserSetupQuestionsUseCase>;

export const getUserSetupQuestionsUseCase = (
    setupQuestionsRepository: ISetupQuestionsRepository
) => async (userId: string) => {
    const rawResponse = await setupQuestionsRepository.getUserSetupQuestions(userId);

    return rawResponse.map(r => ({
        id: r.userSetupQuestion.id,
        question: r.setupQuestion.question,
        answer: r.userSetupQuestion.answer
    })) as FullUserSetupQuestion[];
}