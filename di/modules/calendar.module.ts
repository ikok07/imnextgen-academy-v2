import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {GoogleCalendarService} from "@/src/infrastructure/services/calendar/calendar.service";
import {getCalendarEventsUseCase} from "@/src/application/use-cases/calendar/get-calendar-events.use-case";
import {
    getCalendarEventsController
} from "@/src/interface-adapters/controllers/calendar/get-calendar-events.controller";
import {createCalendarEventUseCase} from "@/src/application/use-cases/calendar/create-calendar-event.use-case";
import {
    createCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/create-calendar-event.controller";
import {updateCalendarEventUseCase} from "@/src/application/use-cases/calendar/update-calendar-event.use-case";
import {
    updateCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/update-calendar-event.controller";
import {deleteCalendarEventUseCase} from "@/src/application/use-cases/calendar/delete-calendar-event.use-case";
import {
    deleteCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/delete-calendar-event.controller";
import {CalendarIdsRepository} from "@/src/infrastructure/repositories/calendar/calendar-ids.repository";
import {
    getCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";
import {
    getCalendarIdByUserIdController
} from "@/src/interface-adapters/controllers/calendar/calendar-ids/get-calendar-id-by-user-id.controller";
import {
    IGetNotificationChannelByIdUseCase
} from "@/src/application/use-cases/google-notification-channels/get-notification-channel-by-id.use-case";
import { getCalendarEventUseCase } from "@/src/application/use-cases/calendar/get-calendar-event.use-case";
import { getCalendarEventController } from "@/src/interface-adapters/controllers/calendar/get-calendar-event.controller";

export function createCalendarModule() {
    const calendarModule = createModule();

    calendarModule
        .bind(DI_SYMBOLS.ICalendarService)
        .toClass(GoogleCalendarService)

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarEventUseCase)
        .toHigherOrderFunction(getCalendarEventUseCase, [DI_SYMBOLS.ICalendarService]);

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarEventController)
        .toHigherOrderFunction(getCalendarEventController, [DI_SYMBOLS.IGetCalendarEventUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarEventsUseCase)
        .toHigherOrderFunction(getCalendarEventsUseCase, [DI_SYMBOLS.ICalendarService]);

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarEventsController)
        .toHigherOrderFunction(getCalendarEventsController, [DI_SYMBOLS.IGetCalendarEventsUseCase, DI_SYMBOLS.IGetCalendarIdByUserIdUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.ICreateCalendarEventUseCase)
        .toHigherOrderFunction(createCalendarEventUseCase, [DI_SYMBOLS.ICalendarService, DI_SYMBOLS.ICreateNotificationChannelUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.ICreateCalendarEventController)
        .toHigherOrderFunction(createCalendarEventController, [DI_SYMBOLS.ICreateCalendarEventUseCase, DI_SYMBOLS.IGetCalendarIdByUserIdUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.IUpdateCalendarEventUseCase)
        .toHigherOrderFunction(updateCalendarEventUseCase, [DI_SYMBOLS.ICalendarService]);

    calendarModule
        .bind(DI_SYMBOLS.IUpdateCalendarEventController)
        .toHigherOrderFunction(updateCalendarEventController, [DI_SYMBOLS.IUpdateCalendarEventUseCase, DI_SYMBOLS.IGetCalendarIdByUserIdUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.IDeleteCalendarEventUseCase)
        .toHigherOrderFunction(deleteCalendarEventUseCase, [DI_SYMBOLS.ICalendarService, DI_SYMBOLS.IDeleteNotificationChannelUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.IDeleteCalendarEventController)
        .toHigherOrderFunction(deleteCalendarEventController, [DI_SYMBOLS.IDeleteCalendarEventUseCase, DI_SYMBOLS.IGetCalendarIdByUserIdUseCase, DI_SYMBOLS.IGetNotificationChannelByIdUseCase]);

    calendarModule
        .bind(DI_SYMBOLS.ICalendarIdsRepository)
        .toClass(CalendarIdsRepository, [DI_SYMBOLS.IGoogleNotificationChannelsRepository]);

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarIdByUserIdUseCase)
        .toHigherOrderFunction(getCalendarIdByUserIdUseCase, [DI_SYMBOLS.ICalendarIdsRepository]);

    calendarModule
        .bind(DI_SYMBOLS.IGetCalendarIdByUserIdController)
        .toHigherOrderFunction(getCalendarIdByUserIdController, [DI_SYMBOLS.IGetCalendarIdByUserIdUseCase]);

    return calendarModule;
}