import {NextResponse} from "next/server";
import {z} from "zod";
import {getInjection} from "@/di/container";
import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";

const sendEmailBodySchema = z.object({
    data: z.object({
        data: z.object({}).passthrough(),
        to_email_address: z.string().email()
    }),
    type: z.literal("email.created"),
})

const sendConfirmEmailDataSchema = z.object({
    otp_code: z.string(),
})

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const protectResponse = clerkWebhookProtect(process.env.CLERK_EMAILS_WEBHOOK_SECRET!, rawBody, req.headers);
        if (protectResponse) return protectResponse;

        const {data: parsedBody, error: emailBodyError} = sendEmailBodySchema.safeParse(JSON.parse(rawBody));
        if (emailBodyError) {
            console.error(emailBodyError)
            return NextResponse.json({status: "fail", error: "Invalid body!"}, {status: 400});
        }

        const {data: parsedEmailData, error: emailDataError} = sendConfirmEmailDataSchema.safeParse(parsedBody.data.data);
        if (emailDataError) {
            console.error(emailDataError)
            return NextResponse.json({status: "fail", error: "Invalid email data!"}, {status: 400});
        }

        const sendConfirmEmailUseCase = getInjection("ISendConfirmEmailUseCase");
        await sendConfirmEmailUseCase({
            to: {
                name: "user",
                email: parsedBody.data.to_email_address
            },
            templateId: 3,
            params: {
                "OTP_CODE": parsedEmailData.otp_code
            }
        })

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500})
    }
}