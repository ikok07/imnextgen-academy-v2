import {SetupQuestion} from "@/drizzle/schema/setup_questions";
import {UserSetupQuestion, UserSetupQuestionInsert} from "@/drizzle/schema/user_setup_questions";

export interface ISetupQuestionsRepository {
    getSetupQuestions(): Promise<SetupQuestion[]>
    getUserSetupQuestions(): Promise<UserSetupQuestion[]>
    setUserSetupQuestions(userId: string, answers: UserSetupQuestionInsert[]): Promise<void>
}