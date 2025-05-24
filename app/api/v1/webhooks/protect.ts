import {Webhook} from "svix"
import {NextResponse} from "next/server";

export function clerkWebhookProtect(secret: string, payload: string, headers: Headers): NextResponse | null {
    try {
        const wh = new Webhook(secret);
        console.log("Authenticating clerk webhook...!");
        wh.verify(payload, {
            "svix-id": headers.get("svix-id") ?? "",
            "svix-timestamp": headers.get("svix-timestamp") ?? "",
            "svix-signature": headers.get("svix-signature") ?? ""
        });
        console.log("Clerk webhook authenticated!");
        return null;
    } catch(e) {
        console.log(`Clerk webhook authorization error: ${e}`);
        return NextResponse.json({status: "fail", error: "Unauthorized"}, {status: 401});
    }
}