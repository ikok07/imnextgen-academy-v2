import {IAddMeetingUseCase} from "@/src/application/use-cases/meetings/add-meeting.use-case";
import {MeetingInsert, meetingInsertSchema} from "@/drizzle/schema/meetings";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddMeetingController = ReturnType<typeof addMeetingController>;

export const addMeetingController = (
    addMeetingUseCase: IAddMeetingUseCase
) => (meeting: MeetingInsert) => {


    const {data: meetingData, error} = meetingInsertSchema.safeParse(meeting);
    if (error) throw new InputParseError("Invalid meetings object!");

    return addMeetingUseCase(meetingData)
}