import {IGetCalendarEventsUseCase} from "@/src/application/use-cases/calendar/get-calendar-events.use-case";
import {
    GetCalendarEventsOptions,
    getCalendarEventsOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";

export type IGetCalendarEventsController = ReturnType<typeof getCalendarEventsController>;

export const getCalendarEventsController = (
    getCalendarEventsUseCase: IGetCalendarEventsUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (userId: string | undefined, opts: Partial<Omit<GetCalendarEventsOptions, "calendarId">>) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    const {calendar_id} = await getCalendarIdByUserIdUseCase(userId);

    const {data: parsedOpts, error} = getCalendarEventsOptionsSchema.safeParse({...opts, calendarId: calendar_id});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getCalendarEventsUseCase(parsedOpts);
}