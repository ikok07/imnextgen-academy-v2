import {ICalendarService} from "@/src/application/services/calendar/calendar.service.interface";
import {IGetCalendarEventsUseCase} from "@/src/application/use-cases/calendar/get-calendar-events.use-case";
import {
    ICreateCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/create-calendar-event.controller";
import {
    IGetCalendarEventsController
} from "@/src/interface-adapters/controllers/calendar/get-calendar-events.controller";
import { ICreateCalendarEventUseCase } from "@/src/application/use-cases/calendar/create-calendar-event.use-case";
import {IUpdateCalendarEventUseCase} from "@/src/application/use-cases/calendar/update-calendar-event.use-case";
import {
    IUpdateCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/update-calendar-event.controller";
import {IDeleteCalendarEventUseCase} from "@/src/application/use-cases/calendar/delete-calendar-event.use-case";
import { IDeleteCalendarEventController } from "@/src/interface-adapters/controllers/calendar/delete-calendar-event.controller";
import {ICalendarIdsRepository} from "@/src/application/repositories/calendar/calendar-ids.repository.interface";
import {
    IGetCalendarIdByUserIdUseCase
} from "@/src/application/use-cases/calendar/calendar-ids/get-calendar-id-by-user-id.use-case";
import {
    IGetCalendarIdByUserIdController
} from "@/src/interface-adapters/controllers/calendar/calendar-ids/get-calendar-id-by-user-id.controller";

export const CALENDAR_SYMBOLS = {
    ICalendarService: Symbol.for("ICalendarService"),

    IGetCalendarEventsUseCase: Symbol.for("IGetCalendarEventsUseCase"),
    IGetCalendarEventsController: Symbol.for("IGetCalendarEventsController"),

    ICreateCalendarEventUseCase: Symbol.for("ICreateCalendarEventUseCase"),
    ICreateCalendarEventController: Symbol.for("ICreateCalendarEventController"),

    IUpdateCalendarEventUseCase: Symbol.for("IUpdateCalendarEventUseCase"),
    IUpdateCalendarEventController: Symbol.for("IUpdateCalendarEventController"),

    IDeleteCalendarEventUseCase: Symbol.for("IDeleteCalendarEventUseCase"),
    IDeleteCalendarEventController: Symbol.for("IDeleteCalendarEventController"),

    ICalendarIdsRepository: Symbol.for("ICalendarIdsRepository"),

    IGetCalendarIdByUserIdUseCase: Symbol.for("IGetCalendarIdByUserIdUseCase"),
    IGetCalendarIdByUserIdController: Symbol.for("IGetCalendarIdByUserIdController")
}

export interface CALENDAR_RETURN_TYPES {
    ICalendarService: ICalendarService,

    IGetCalendarEventsUseCase: IGetCalendarEventsUseCase,
    IGetCalendarEventsController: IGetCalendarEventsController,

    ICreateCalendarEventUseCase: ICreateCalendarEventUseCase,
    ICreateCalendarEventController: ICreateCalendarEventController,

    IUpdateCalendarEventUseCase: IUpdateCalendarEventUseCase,
    IUpdateCalendarEventController: IUpdateCalendarEventController,

    IDeleteCalendarEventUseCase: IDeleteCalendarEventUseCase,
    IDeleteCalendarEventController: IDeleteCalendarEventController,

    ICalendarIdsRepository: ICalendarIdsRepository,

    IGetCalendarIdByUserIdUseCase: IGetCalendarIdByUserIdUseCase,
    IGetCalendarIdByUserIdController: IGetCalendarIdByUserIdController
}


