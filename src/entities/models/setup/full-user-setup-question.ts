import {z} from "zod";

export const fullUserSetupQuestionSchema = z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string(),
});

export type FullUserSetupQuestion = z.infer<typeof fullUserSetupQuestionSchema>;