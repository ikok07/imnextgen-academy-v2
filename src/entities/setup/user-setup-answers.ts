import {z} from "zod";

export const userSetupAnswers = z.object({
    id: z.string(),
    text: z.string().nullable()
})

export type UserSetupAnswer = z.infer<typeof userSetupAnswers>;