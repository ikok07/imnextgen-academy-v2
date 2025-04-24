import {
    IGetMeetingRepeatDaysUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meeting-repeat-days.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingRepeatDaysController = ReturnType<typeof getMeetingRepeatDaysController>;

export const getMeetingRepeatDaysController = (
    getMeetingRepeatDaysUseCase: IGetMeetingRepeatDaysUseCase
) => (meetingId: string | undefined) => {

    if (!meetingId) throw new InputParseError("Invalid meetingId!");

    return getMeetingRepeatDaysUseCase(meetingId)
}