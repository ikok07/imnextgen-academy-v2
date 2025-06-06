import {
    IGetSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSpecificMeetingsByUserIdController = ReturnType<typeof getSpecificMeetingsByUserIdController>;

export const getSpecificMeetingsByUserIdController = (
    getSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase
) => async (userId: string | undefined, timezoneOffsetMin?: number | undefined, startDate?: number | undefined) => {
    if (!userId) throw new InputParseError("Invalid userId!");

    return getSpecificMeetingsByUserIdUseCase(userId, timezoneOffsetMin, startDate);
}