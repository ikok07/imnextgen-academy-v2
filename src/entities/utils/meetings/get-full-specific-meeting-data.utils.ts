import { UserSpecificMeeting } from "@/drizzle/schema/user_specific_meetings";
import {FullSpecificMeeting} from "@/src/entities/models/meetings/full-meeting";

export function getFullSpecificMeetingData(specificMeeting: UserSpecificMeeting): FullSpecificMeeting {
    switch (specificMeeting.type) {
        case "sales-meeting":
            return {
                ...specificMeeting,
                meetingType: "specific"
            }
    }
}