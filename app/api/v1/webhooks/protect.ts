import {Webhook} from "svix"
import {NextResponse} from "next/server";

export function clerkWebhookProtect(secret: string, payload: string, headers: Headers): NextResponse | null {
    try {
        const wh = new Webhook(secret);

        wh.verify(payload, {
            "svix-id": headers.get("svix-id") ?? "",
            "svix-timestamp": headers.get("svix-timestamp") ?? "",
            "svix-signature": headers.get("svix-signature") ?? ""
        });
        return null;
    } catch(e) {
        return NextResponse.json({status: "fail", error: "Unauthorized"}, {status: 401});
    }
}