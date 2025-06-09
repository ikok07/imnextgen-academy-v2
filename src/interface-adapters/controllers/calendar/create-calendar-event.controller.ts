import {ICreateCalendarEventUseCase} from "@/src/application/use-cases/calendar/create-calendar-event.use-case";
import {
    CreateCalendarEventOptions,
    createCalendarEventOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";

export type ICreateCalendarEventController = ReturnType<typeof createCalendarEventController>;

export const createCalendarEventController = (
    createCalendarEventUseCase: ICreateCalendarEventUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (userId: string | undefined, opts: Partial<Omit<CreateCalendarEventOptions, "calendarId">>) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    const {calendar_id} = await getCalendarIdByUserIdUseCase(userId);

    const {data: parsedOpts, error} = createCalendarEventOptionsSchema.safeParse({...opts, calendarId: calendar_id});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return createCalendarEventUseCase(parsedOpts);
}