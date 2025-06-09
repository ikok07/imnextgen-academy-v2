import {IUpdateCalendarEventUseCase} from "@/src/application/use-cases/calendar/update-calendar-event.use-case";
import {
    UpdateCalendarEventOptions,
    updateCalendarEventOptionsSchema
} from "@/src/application/services/calendar/calendar.service.interface";
import {InputParseError} from "@/src/entities/errors/common";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";
import {z} from "zod";

export type IUpdateCalendarEventController = ReturnType<typeof updateCalendarEventController>;

export const updateCalendarEventControllerUserIdOptions = z.object({
    userId: z.string(),
    calendarId: z.undefined()
});

export const updateCalendarEventControllerCalendarIdOptions = z.object({
    userId: z.undefined(),
    calendarId: z.string()
});

export const updateCalendarEventControllerOptionsSchema = updateCalendarEventControllerUserIdOptions.or(updateCalendarEventControllerCalendarIdOptions);

export type UpdateCalendarEventControllerOptions = z.infer<typeof updateCalendarEventControllerOptionsSchema>;

export const updateCalendarEventController = (
    updateCalendarEventUseCase: IUpdateCalendarEventUseCase,
    getCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase
) => async (controllerOpts: UpdateCalendarEventControllerOptions, opts: Partial<Omit<UpdateCalendarEventOptions, "calendarId">>) => {
    let calendarId: string | undefined = controllerOpts.calendarId;

    if (!calendarId) {
        if (controllerOpts.userId) {
            const {calendar_id} = await getCalendarIdByUserIdUseCase(controllerOpts.userId);
            calendarId = calendar_id;
        } else throw new InputParseError("Neither userId nor calendarId was passed!");
    }

    const {data: parsedOpts, error} = updateCalendarEventOptionsSchema.safeParse({...opts, calendarId});
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    return updateCalendarEventUseCase(parsedOpts);
}