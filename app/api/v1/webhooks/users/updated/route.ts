import {NextRequest, NextResponse} from "next/server";
import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";
import {z} from "zod";
import {getInjection} from "@/di/container";

const requestBodySchema = z.object({
    type: z.literal("user.updated"),
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

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const protectResponse = clerkWebhookProtect(process.env.CLERK_USER_UPDATED_WEBHOOK_SECRET!, rawBody, req.headers);
        if (protectResponse) return protectResponse;

        const {data: body, error: bodyError} = requestBodySchema.safeParse(JSON.parse(rawBody));
        if (bodyError) return NextResponse.json({status: "fail", error: "Invalid body!"}, {status: 400});

        await getInjection("IUpdateProfileController")(body.data.id, {
            name: `${body.data.first_name} ${body.data.last_name}`,
            email: body.data.email_addresses[0]?.email_address ?? "<email-removed>",
            phone: body.data.phone_numbers[0]?.phone_number ?? "<phone-removed>",
            image_url: body.data.image_url,
        });

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        return NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500});
    }
}