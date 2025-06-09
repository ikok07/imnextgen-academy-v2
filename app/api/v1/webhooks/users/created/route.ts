import {z} from "zod";
import {NextResponse} from "next/server";
import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";
import {getInjection} from "@/di/container";
import axios from "axios";

const requestBodySchema = z.object({
    type: z.literal("user.created"),
    data: z.object({
        id: z.string(),
        email_addresses: z.array(z.object({
            email_address: z.string().email(),
        })),
        phone_numbers: z.array(z.object({
            phone_number: z.string()
        })),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        image_url: z.string().url().nullable()
    })
});

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const protectResponse = clerkWebhookProtect(process.env.CLERK_USER_CREATED_WEBHOOK_SECRET!, rawBody, req.headers);
        if (protectResponse) return protectResponse;

        const {data: body, error: bodyError} = requestBodySchema.safeParse(JSON.parse(rawBody));
        if (bodyError) {
            console.error(bodyError);
            return NextResponse.json({status: "fail", error: "Invalid body!"}, {status: 400});
        }

        const newProfile = await getInjection("ICreateProfileController")({
            id: body.data.id,
            name: `${body.data.first_name} ${body.data.last_name}`,
            email: body.data.email_addresses[0].email_address,
            phone: body.data.phone_numbers[0].phone_number,
            image_url: body.data.image_url,
        });

        const adminProfiles = await getInjection("IGetAllProfilesForRoleController")("admin");

        for (const profile of adminProfiles) {
            await getInjection("ISendEmailUseCase")({
                to: {
                    email: profile.email,
                    name: profile.name
                },
                templateId: +process.env.BREVO_NEW_CUSTOMER_EMAIL_ID_BG!,
                params: {
                    "NAME": newProfile.name,
                    "EMAIL": newProfile.email,
                    "PHONE": newProfile.phone
                }
            })
        }

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        return NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500});
    }
}