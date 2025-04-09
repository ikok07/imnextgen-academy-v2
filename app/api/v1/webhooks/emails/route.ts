import {NextResponse} from "next/server";
import {z} from "zod";
import {getInjection} from "@/di/container";
import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";
import {clerkClient} from "@clerk/nextjs/server";

const sendEmailBodySchema = z.object({
    data: z.object({
        data: z.object({}).passthrough(),
        slug: z.string(),
        to_email_address: z.string().email(),
        user_id: z.string()
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

        const client = await clerkClient()
        const user = await client.users.getUser(parsedBody.data.user_id);

        switch (parsedBody.data.slug) {
            case "verification_code":
                await sendConfirmEmail(parsedBody.data.data, parsedBody.data.to_email_address, user.unsafeMetadata.locale as string | undefined ?? "en");
                break;
        }

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        return NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500})
    }
}

async function sendConfirmEmail(parsedBodyData: object, to_email_address: string, locale: string) {
    const {data: parsedEmailData, error: emailDataError} = sendConfirmEmailDataSchema.safeParse(parsedBodyData);
    if (emailDataError) {
        console.error(emailDataError)
        return NextResponse.json({status: "fail", error: "Invalid email data!"}, {status: 400});
    }

    const sendConfirmEmailUseCase = getInjection("ISendConfirmEmailUseCase");
    await sendConfirmEmailUseCase({
        to: {
            name: "user",
            email: to_email_address
        },
        templateId: locale === "bg" ? +process.env.BREVO_CONFIRM_EMAIL_ID_BG! : +process.env.BREVO_CONFIRM_EMAIL_ID_EN!,
        params: {
            "OTP_CODE": parsedEmailData.otp_code
        }
    })
}