import {
    IGetMeetingDatesByStartDateUseCase
} from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates-by-start-date.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingDatesByStartDateController = ReturnType<typeof getMeetingDatesByStartDateController>;

export const getMeetingDatesByStartDateController = (
    getMeetingDatesByStartDateUseCase: IGetMeetingDatesByStartDateUseCase
) => (startDate: number | undefined) => {

    if (!startDate || startDate < new Date(1, 1, new Date().getFullYear() - 1).valueOf()) throw new InputParseError("Invalid start date!");

    return getMeetingDatesByStartDateUseCase(startDate);
}