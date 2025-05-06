import {NextResponse} from "next/server";
import {z} from "zod";
import {getInjection} from "@/di/container";
import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";
import {clerkClient} from "@clerk/nextjs/server";
import {User} from "@clerk/backend";

const sendEmailBodySchema = z.object({
    data: z.object({
        data: z.object({}).passthrough(),
        slug: z.string(),
        to_email_address: z.string().email(),
        user_id: z.string().nullable()
    }),
    type: z.literal("email.created"),
})

const sendOtpEmailDataSchema = z.object({
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

        const client = await clerkClient();
        let user: User | undefined;
        if (parsedBody.data.user_id) {
            user = await client.users.getUser(parsedBody.data.user_id);
        } else {
            user = (await client.users.getUserList({
                emailAddress: [parsedBody.data.to_email_address]
            })).data[0];
        }

        const locale = user.unsafeMetadata.locale as string | undefined ?? "en";

        switch (parsedBody.data.slug) {
            case "verification_code":
                await sendOtpCodeEmail({
                    to: parsedBody.data.to_email_address,
                    templateId: locale === "bg" ? +process.env.BREVO_OTP_EMAIL_ID_BG! : +process.env.BREVO_OTP_EMAIL_ID_EN!,
                    data: parsedBody.data. data
                });
                break;
            case "reset_password_code":
                await sendOtpCodeEmail({
                    to: parsedBody.data.to_email_address,
                    templateId: locale === "bg" ? +process.env.BREVO_RESET_PASSWORD_EMAIL_ID_BG! : +process.env.BREVO_RESET_PASSWORD_EMAIL_ID_EN!,
                    data: parsedBody.data. data
                });
                break;
            case "password_changed":
                await getInjection("ISendEmailUseCase")({
                    to: {
                        name: "user",
                        email: parsedBody.data.to_email_address
                    },
                    templateId: locale === "bg" ? +process.env.BREVO_PASSWORD_CHANGED_EMAIL_ID_BG! : +process.env.BREVO_PASSWORD_CHANGED_EMAIL_ID_EN!,
                });
                break;
        }

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        return NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500})
    }
}

async function sendOtpCodeEmail({data, to, templateId}: {data: object, to: string, templateId: number}) {
    const {data: parsedData, error: emailDataError} = sendOtpEmailDataSchema.safeParse(data);
    if (emailDataError) {
        console.error(emailDataError)
        return NextResponse.json({status: "fail", error: "Invalid email data!"}, {status: 400});
    }

    await getInjection("ISendEmailUseCase")({
        to: {
            name: "user",
            email: to
        },
        templateId: templateId,
        params: {
            "OTP_CODE": parsedData.otp_code
        }
    });
}