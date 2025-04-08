import {BrevoEmailService} from "@/src/infrastructure/services/emails/brevo-email.service";

export const EMAIL_SYMBOLS = {
    BrevoEmailService: Symbol.for("BrevoEmailService")
}

export interface EMAIL_RETURN_TYPES {
    BrevoEmailService: BrevoEmailService
}


