import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {BrevoEmailService} from "@/src/infrastructure/services/emails/brevo-email.service";
import {sendEmailUseCase} from "@/src/application/use-cases/email/send-confirm-email.use-case";

export function createEmailsModule() {
    const emailsModule = createModule();

    emailsModule
        .bind(DI_SYMBOLS.BrevoEmailService)
        .toClass(BrevoEmailService);

    emailsModule
        .bind(DI_SYMBOLS.ISendEmailUseCase)
        .toHigherOrderFunction(sendEmailUseCase, [DI_SYMBOLS.BrevoEmailService]);

    return emailsModule;
}