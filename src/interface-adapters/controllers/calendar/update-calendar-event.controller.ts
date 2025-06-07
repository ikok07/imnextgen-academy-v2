import {IUpdateCalendarEventUseCase} from "@/src/application/use-cases/calendar/update-calendar-event.use-case";
import {
    UpdateCalendarEventOptions,
    updateCalendarEventOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";

export type IUpdateCalendarEventController = ReturnType<typeof updateCalendarEventController>;

export const updateCalendarEventController = (
    updateCalendarEventUseCase: IUpdateCalendarEventUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (userId: string | undefined, opts: Partial<Omit<UpdateCalendarEventOptions, "calendarId">>) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    const {calendar_id} = await getCalendarIdByUserIdUseCase(userId);

    const {data: parsedOpts, error} = updateCalendarEventOptionsSchema.safeParse({...opts, calendarId: calendar_id});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return updateCalendarEventUseCase(parsedOpts);
}