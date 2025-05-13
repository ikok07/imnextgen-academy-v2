import {calculationForAllSchemesOptionsSchema} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {NextRequest, NextResponse} from "next/server";
import {getInjection} from "@/di/container";

const bodySchema = calculationForAllSchemesOptionsSchema;

export async function POST(req: NextRequest) {
    try {
        if (!await getInjection("IValidateBackendKeyController")(req.headers.get("Authorization") ?? undefined)) return NextResponse.json({error: "Unauthorized"}, {status: 401});

        const {data: parsedBody, error: bodyError} = bodySchema.safeParse(await req.json());
        if (bodyError) return NextResponse.json({error: "Invalid body"}, {status: 400});

        return NextResponse.json({status: "success", data: await getInjection("IGetCalculationForAllSchemesController")(parsedBody)});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: "Internal server error!"}, {status: 500});
    }
}