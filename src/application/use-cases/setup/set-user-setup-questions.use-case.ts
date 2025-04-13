import {ISetupQuestionsRepository} from "@/src/application/repositories/setup/setup-questions.repository.interface";
import {UserSetupAnswer} from "@/src/entities/setup/user-setup-answers";

export type ISetUserSetupQuestionsUseCase = ReturnType<typeof setUserSetupQuestionsUseCase>;

export const setUserSetupQuestionsUseCase = (
    setupQuestionsRepository: ISetupQuestionsRepository
) => async (userId: string, answers: UserSetupAnswer[]) => {
    const insertAnswers = answers.map(a => ({question_id: a.id, profile_id: userId, answer: a.text}));
    return setupQuestionsRepository.setUserSetupQuestions(userId, insertAnswers)
}