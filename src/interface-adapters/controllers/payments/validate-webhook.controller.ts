import {IValidateWebhookUseCase} from "@/src/application/use-cases/payments/validate-webhook.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IValidateWebhookController = ReturnType<typeof validateWebhookController>;

export const validateWebhookController = (
    validateWebhookUseCase: IValidateWebhookUseCase
) => async (rawBody: string | undefined, signature: string | undefined, secret: string | undefined) => {

    if (!rawBody) throw new InputParseError("Invalid rawBody!");
    if (!signature) throw new InputParseError("Invalid signature!");
    if (!secret) throw new InputParseError("Invalid secret!");

    return validateWebhookUseCase(rawBody, signature, secret);
}