import {
    IGetMeetingExcludedDatesUseCase
} from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-meeting-excluded-dates.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingExcludedDatesController = ReturnType<typeof getMeetingExcludedDatesController>;

export const getMeetingExcludedDatesController = (
    getMeetingExcludedDatesUseCase: IGetMeetingExcludedDatesUseCase
) => async (meetingId: string) => {

    if (!meetingId) throw new InputParseError("Invalid meetingId!");

    return getMeetingExcludedDatesUseCase(meetingId);
}