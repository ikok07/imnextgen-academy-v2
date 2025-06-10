import { UserSpecificMeeting } from "@/drizzle/schema/user_specific_meetings";
import {FullSpecificMeeting} from "@/src/entities/models/meetings/full-meeting";

export function getFullSpecificMeetingData(specificMeeting: UserSpecificMeeting): FullSpecificMeeting {
    switch (specificMeeting.type) {
        case "sales-meeting":
            return {
                ...specificMeeting,
                meetingType: "specific",
                access: "free",
                title: "Среща с ментор",
                description: "Нека обсъдим пътя ти в академията към кариера в ИТ сферата",
                image_url: "/api/v1/assets?bucket=academy-v2&path=sales_meeting.jpg",
            }
    }
}