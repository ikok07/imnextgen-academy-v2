import {IGetCalendarEventUseCase} from "@/src/application/use-cases/calendar/get-calendar-event.use-case";
import {
    getCalendarEventOptionsSchema,
    GetCalendarEventOptions
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetCalendarEventController = ReturnType<typeof getCalendarEventController>;

export const getCalendarEventController = (
    getCalendarEventUseCase: IGetCalendarEventUseCase
) => async (opts: Partial<GetCalendarEventOptions>) => {

    const {data: parsedOpts, error} = getCalendarEventOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return getCalendarEventUseCase(parsedOpts);
}