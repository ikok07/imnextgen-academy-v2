import {SetupQuestion, setupQuestionSchema} from "@/drizzle/schema/setup_questions";
import {
    UserSetupQuestion,
    UserSetupQuestionInsert,
    userSetupQuestionSchema
} from "@/drizzle/schema/user_setup_questions";
import {z} from "zod";

export const getUserSetupQuestionsRawResponse = z.array(z.object({
    userSetupQuestion: userSetupQuestionSchema,
    setupQuestion: setupQuestionSchema
}));

export type GetUserSetupQuestionsRawResponse = z.infer<typeof getUserSetupQuestionsRawResponse>;

export interface ISetupQuestionsRepository {
    getSetupQuestions(): Promise<SetupQuestion[]>
    getUserSetupQuestions(userId: string): Promise<GetUserSetupQuestionsRawResponse>
    setUserSetupQuestions(userId: string, answers: UserSetupQuestionInsert[]): Promise<void>
}