import { z } from "zod";

export const emailServiceSendEmailOptionsSchema = z.object({
    to: z.object({
        name: z.string(),
        email: z.string().email()
    }),
    templateId: z.number(),
    params: z.object({}).passthrough()
})

export type ISendEmailServiceOptions = z.infer<typeof emailServiceSendEmailOptionsSchema>

export interface IEmailService {
    sendEmail(opts: ISendEmailServiceOptions): Promise<void>;
}