import {IEmailService, ISendEmailServiceOptions } from "../../services/emails/email.service.interface";

export type ISendConfirmEmailUseCase = ReturnType<typeof sendConfirmEmailUseCase>;

export const sendConfirmEmailUseCase = (
    emailService: IEmailService
) => async (
    opts: ISendEmailServiceOptions
) => {
    await emailService.sendEmail(opts);
}