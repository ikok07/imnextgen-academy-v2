import {clerkWebhookProtect} from "@/app/api/v1/webhooks/protect";
import {NextResponse} from "next/server";
import {z} from "zod";
import {getInjection} from "@/di/container";

const requestBodySchema = z.object({
    type: z.literal("user.deleted"),
    data: z.object({
        id: z.string(),
    })
});

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const protectResponse = clerkWebhookProtect(process.env.CLERK_USER_DELETED_WEBHOOK_SECRET!, rawBody, req.headers);
        if (protectResponse) return protectResponse;

        const {data: body, error: bodyError} = requestBodySchema.safeParse(JSON.parse(rawBody));
        if (bodyError) {
            console.error(bodyError);
            return NextResponse.json({status: "fail", error: "Invalid body!"}, {status: 400});
        }

        const deleteProfileController = getInjection("IDeleteProfileController");
        await deleteProfileController(body.data.id);

        return NextResponse.json({status: "success"});
    } catch(e) {
        console.error(e);
        return NextResponse.json({status: "fail", error: "Something went wrong!"}, {status: 500})
    }
}