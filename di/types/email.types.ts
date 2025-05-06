import {BrevoEmailService} from "@/src/infrastructure/services/emails/brevo-email.service";
import {ISendEmailUseCase} from "@/src/application/use-cases/email/send-confirm-email.use-case";

export const EMAIL_SYMBOLS = {
    BrevoEmailService: Symbol.for("BrevoEmailService"),

    ISendEmailUseCase: Symbol.for("ISendEmailUseCase"),
}

export interface EMAIL_RETURN_TYPES {
    BrevoEmailService: BrevoEmailService,

    ISendEmailUseCase: ISendEmailUseCase
}


