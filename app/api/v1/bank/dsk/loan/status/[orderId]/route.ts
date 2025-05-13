import {NextRequest, NextResponse} from "next/server";
import {getInjection} from "@/di/container";

export async function GET(req: NextRequest, {params}: {params: Promise<{orderId: string}>}) {
    try {
        if (!await getInjection("IValidateBackendKeyController")(req.headers.get("Authorization") ?? undefined)) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const {orderId} = await params;

        return NextResponse.json({
            status: "success",
            data: await getInjection("IGetPaymentStatusController")({
                orderId
            })
        });
    } catch(e) {
        console.error(e);
        return NextResponse.json({error: "Internal server error!"}, {status: 500});
    }
}