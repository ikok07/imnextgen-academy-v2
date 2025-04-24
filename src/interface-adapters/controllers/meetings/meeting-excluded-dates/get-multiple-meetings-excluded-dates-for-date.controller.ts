import {
    IGetMultipleMeetingsExcludedDatesForDateUseCase
} from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-multiple-meetings-excluded-dates-for-date.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMultipleMeetingsExcludedDatesForDateController = ReturnType<typeof getMultipleMeetingsExcludedDatesForDateController>;

export const getMultipleMeetingsExcludedDatesForDateController = (
    getMultipleMeetingsExcludedDatesForDateUseCase: IGetMultipleMeetingsExcludedDatesForDateUseCase
) => (moduleIds: string[] | undefined, startDate: number | undefined) => {

    if (!moduleIds || moduleIds.length === 0)
        throw new InputParseError("Invalid module ids!");

    if (!startDate || startDate < new Date(1, 1, new Date().getFullYear() - 1).valueOf())
        throw new InputParseError("Invalid start date!");

    return getMultipleMeetingsExcludedDatesForDateUseCase(moduleIds, startDate);
}