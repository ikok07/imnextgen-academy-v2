import {IDeleteCalendarEventUseCase} from "@/src/application/use-cases/calendar/delete-calendar-event.use-case";
import {
    DeleteCalendarEventOptions,
    deleteCalendarEventOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";

export type IDeleteCalendarEventController = ReturnType<typeof deleteCalendarEventController>;

export const deleteCalendarEventController = (
    deleteCalendarEventUseCase: IDeleteCalendarEventUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (userId: string | undefined, opts: Partial<Omit<DeleteCalendarEventOptions, "calendarId">>) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    const calendarId = await getCalendarIdByUserIdUseCase(userId);

    const {data: parsedOpts, error} = deleteCalendarEventOptionsSchema.safeParse({...opts, calendarId});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return deleteCalendarEventUseCase(parsedOpts);
}