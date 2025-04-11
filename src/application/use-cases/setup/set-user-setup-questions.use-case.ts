import {ISetupQuestionsRepository} from "@/src/application/repositories/setup-questions.repository.interface";
import {UserSetupQuestionInsert} from "@/drizzle/schema/user_setup_questions";

export type ISetUserSetupQuestionsUseCase = ReturnType<typeof setUserSetupQuestionsUseCase>;

export const setUserSetupQuestionsUseCase = (
    setupQuestionsRepository: ISetupQuestionsRepository
) => async (userId: string, answers: UserSetupQuestionInsert[]) => {
    return setupQuestionsRepository.setUserSetupQuestions(userId, answers)
}