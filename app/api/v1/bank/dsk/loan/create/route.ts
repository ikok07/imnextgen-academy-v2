import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import {getInjection} from "@/di/container";
import {
    sendDirectPayModifiedOptionsSchema
} from "@/src/interface-adapters/controllers/payments/dsk/pay-direct.controller";

const bodySchema = z.object({
    userId: z.string(),
    loanData: sendDirectPayModifiedOptionsSchema
});

export async function POST(req: NextRequest) {
    try {
        if (!await getInjection("IValidateBackendKeyController")(req.headers.get("Authorization") ?? undefined)) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const {data: parsedBody, error: bodyError} = bodySchema.safeParse(await req.json());
        if (bodyError) return NextResponse.json({error: "Invalid body"}, {status: 400});

        const result = await getInjection("IPayDirectController")(parsedBody.userId, parsedBody.loanData);
        return NextResponse.json({status: "success", data: result})
    } catch(e) {
        console.error(e);
        return NextResponse.json({error: "Internal server error!"}, {status: 500});
    }
}