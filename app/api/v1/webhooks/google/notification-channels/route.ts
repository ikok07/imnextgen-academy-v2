import {NextRequest, NextResponse} from "next/server";
import {getInjection} from "@/di/container";
import crypto from "node:crypto";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {millisecondsToMinutes} from "date-fns";

export async function POST(req: NextRequest) {
    try {
        const channelId = req.headers.get("x-goog-channel-id");
        const token = req.headers.get("x-goog-channel-token");
        const hashedToken = token ? crypto.createHmac("sha256", process.env.KEYS_SECRET!).update(token).digest("base64") : null;
        const state = req.headers.get("x-goog-resource-state") as "sync" | "exists";

        if (state !== "exists") return NextResponse.json({status: "success"});

        const notificationChannel = await getInjection("IGetNotificationChannelByIdController")({
            id: channelId ?? undefined
        });

        if (hashedToken !== notificationChannel.token) return NextResponse.json({status: "failed", error: "Unauthorized"}, {status: 401});

        const currEvent = await getInjection("IGetCalendarEventController")({
            calendarId: notificationChannel.calendar_id,
            eventId: notificationChannel.resource_id
        });

        await getInjection("ISystemUpdateUserSpecificMeetingController")({
            date: currEvent.start / 1000,
            duration_minutes: millisecondsToMinutes(currEvent.end - currEvent.start)
        });

        return NextResponse.json({status: "success"});
    } catch (e) {
        console.error(e);
        if (e instanceof DatabaseError) {
            return NextResponse.json({status: "failed", error: "Notification channel not found in database!"}, {status: 404});
        }
        return NextResponse.json({status: "failed", error: "Internal server error"}, {status: 500});
    }
}