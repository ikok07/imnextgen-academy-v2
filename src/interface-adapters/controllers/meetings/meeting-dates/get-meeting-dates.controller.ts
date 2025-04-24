import {IGetMeetingDatesUseCase} from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingDatesController = ReturnType<typeof getMeetingDatesController>;

export const getMeetingDatesController = (
    getMeetingDatesUseCase: IGetMeetingDatesUseCase
) => async (meetingId: string) => {

    if (!meetingId) throw new InputParseError("Invalid meetingId!");

    return getMeetingDatesUseCase(meetingId);
}