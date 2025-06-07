import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetCalendarIdByUserIdController = ReturnType<typeof getCalendarIdByUserIdController>;

export const getCalendarIdByUserIdController = (
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return getCalendarIdByUserIdUseCase(userId);
}