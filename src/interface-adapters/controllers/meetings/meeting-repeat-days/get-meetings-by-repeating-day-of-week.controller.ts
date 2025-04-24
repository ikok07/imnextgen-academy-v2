import {
    IGetMeetingsByRepeatingDayOfWeekUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meetings-by-repeating-day-of-week.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMeetingsByRepeatingDayOfWeekController = ReturnType<typeof getMeetingsByRepeatingDayOfWeekController>;

export const getMeetingsByRepeatingDayOfWeekController = (
    getMeetingsByRepeatingDayOfWeekUseCase: IGetMeetingsByRepeatingDayOfWeekUseCase
) => (dayOfWeek: number | undefined) => {

    if (!dayOfWeek || dayOfWeek < 0 || dayOfWeek > 6) throw new InputParseError("Invalid day of week!");

    return getMeetingsByRepeatingDayOfWeekUseCase(dayOfWeek);
}