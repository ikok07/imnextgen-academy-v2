import {IEmailService, ISendEmailServiceOptions } from "../../services/emails/email.service.interface";

export type ISendEmailUseCase = ReturnType<typeof sendEmailUseCase>;

export const sendEmailUseCase = (
    emailService: IEmailService
) => async (
    opts: ISendEmailServiceOptions
) => {
    await emailService.sendEmail(opts);
}