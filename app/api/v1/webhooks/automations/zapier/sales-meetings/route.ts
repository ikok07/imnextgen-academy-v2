import {getInjection} from "@/di/container";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";

const bodySchema = z.object({
    userId: z.string(),
    meetingDateTimestamp: z.number()
});

export async function POST(req: NextRequest) {
    const {data: body, error} = bodySchema.safeParse(await req.json());
    if (error) return NextResponse.json({status: "fail", error: "Invalid body!"}, {status: 400});
    const specificMeetings = await getInjection("ISystemGetUserSpecificMeetingsByUserIdController")({
        userId: body.userId,
        meetingType: "sales-meeting",
        startDate: body.meetingDateTimestamp * 1000,
        timezoneOffsetMin: new Date().getTimezoneOffset()
    });

    return NextResponse.json({status: "success", data: specificMeetings.length > 0});
}