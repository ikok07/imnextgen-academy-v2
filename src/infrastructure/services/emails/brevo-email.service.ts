import {IEmailService, ISendEmailServiceOptions} from "@/src/application/services/emails/email.service.interface";
import { EmailError } from "@/src/entities/errors/email/email";
import axios from "axios";

export class BrevoEmailService implements IEmailService {
    async sendEmail({to, templateId, params}: ISendEmailServiceOptions): Promise<void> {
        try {
            await axios.post("https://api.brevo.com/v3/smtp/email", {
                sender: {
                    name: process.env.BREVO_SENDER_NAME,
                    email: process.env.BREVO_SENDER_EMAIL
                },
                to: [to],
                templateId,
                params
            }, {
                headers: {
                    "api-key": process.env.BREVO_API_KEY
                }
            })
        } catch (e) {
            throw new EmailError(`Failed to send email: ${(e as Error).message}`);
        }
    }
}