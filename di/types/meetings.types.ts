import { IMeetingsRepository } from "@/src/application/repositories/meetings/meetings.repository.interface";
import {IRemoveMeetingUseCase } from "@/src/application/use-cases/meetings/remove-meeting.use-case";
import { IUpdateMeetingUseCase } from "@/src/application/use-cases/meetings/update-meeting.use-case";
import { IAddMeetingController } from "@/src/interface-adapters/controllers/meetings/add-meeting.controller";
import { IUpdateMeetingController } from "@/src/interface-adapters/controllers/meetings/update-meeting.controller";
import {IAddMeetingUseCase} from "@/src/application/use-cases/meetings/add-meeting.use-case";
import {IGetMeetingByIdController} from "@/src/interface-adapters/controllers/meetings/get-meeting-by-id.controller";
import { IGetMeetingByIdUseCase } from "@/src/application/use-cases/meetings/get-meeting-by-id.use-case";
import { IGetMeetingsController } from "@/src/interface-adapters/controllers/meetings/get-meetings.controller";
import { IGetMeetingsUseCase } from "@/src/application/use-cases/meetings/get-meetings.use-case";
import {IRemoveMeetingController} from "@/src/interface-adapters/controllers/meetings/remove-meeting.controller";
import {
    IGetMeetingRepeatDaysUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meeting-repeat-days.use-case";
import { IGetMeetingRepeatDaysController } from "@/src/interface-adapters/controllers/meetings/meeting-repeat-days/get-meeting-repeat-days.controller";
import {
    IMeetingRepeatDaysRepository
} from "@/src/application/repositories/meetings/meeting-repeat-days.repository.interface";
import {
    IGetMeetingExcludedDatesUseCase
} from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-meeting-excluded-dates.use-case";
import {
    IGetMeetingExcludedDatesController
} from "@/src/interface-adapters/controllers/meetings/meeting-excluded-dates/get-meeting-excluded-dates.controller";
import { IGetMeetingDatesUseCase } from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates.use-case";
import {
    IGetMeetingDatesController
} from "@/src/interface-adapters/controllers/meetings/meeting-dates/get-meeting-dates.controller";
import {
    IMeetingExcludedDatesRepository
} from "@/src/application/repositories/meetings/meeting-excluded-dates.repository.interface";
import {IMeetingDatesRepository} from "@/src/application/repositories/meetings/meeting-dates.repository.interface";
import {IGetFullMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-meeting-by-id.use-case";
import { IGetFullMeetingByIdController } from "@/src/interface-adapters/controllers/meetings/get-full-meeting-by-id.controller";
import {
    IGetMeetingsByRepeatingDayOfWeekUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meetings-by-repeating-day-of-week.use-case";
import {
    IGetMeetingsByRepeatingDayOfWeekController
} from "@/src/interface-adapters/controllers/meetings/meeting-repeat-days/get-meetings-by-repeating-day-of-week.controller";
import {
    IGetMeetingDatesByStartDateUseCase
} from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates-by-start-date.use-case";
import {
    IGetMeetingDatesByStartDateController
} from "@/src/interface-adapters/controllers/meetings/meeting-dates/get-meeting-dates-by-start-date.controller";
import {
    IGetMultipleMeetingsExcludedDatesForDateController
} from "@/src/interface-adapters/controllers/meetings/meeting-excluded-dates/get-multiple-meetings-excluded-dates-for-date.controller";
import { IGetMultipleMeetingsExcludedDatesForDateUseCase } from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-multiple-meetings-excluded-dates-for-date.use-case";

export const MEETINGS_SYMBOLS = {
    IMeetingsRepository: Symbol.for("IMeetingsRepository"),

    IGetMeetingsUseCase: Symbol.for("IGetMeetingsUseCase"),
    IGetMeetingsController: Symbol.for("IGetMeetingsController"),

    IGetFullMeetingByIdUseCase: Symbol.for("IGetFullMeetingByIdUseCase"),
    IGetFullMeetingByIdController: Symbol.for("IGetFullMeetingByIdController"),

    IGetMeetingByIdUseCase: Symbol.for("IGetMeetingByIdUseCase"),
    IGetMeetingByIdController: Symbol.for("IGetMeetingByIdController"),

    IAddMeetingUseCase: Symbol.for("IAddMeetingUseCase"),
    IAddMeetingController: Symbol.for("IAddMeetingController"),

    IRemoveMeetingUseCase: Symbol.for("IRemoveMeetingUseCase"),
    IRemoveMeetingController: Symbol.for("IRemoveMeetingController"),

    IUpdateMeetingUseCase: Symbol.for("IUpdateMeetingUseCase"),
    IUpdateMeetingController: Symbol.for("IUpdateMeetingController"),

    IMeetingRepeatDaysRepository: Symbol.for("IMeetingRepeatDaysRepository"),

    IGetMeetingRepeatDaysUseCase: Symbol.for("IGetMeetingRepeatDaysUseCase"),
    IGetMeetingRepeatDaysController: Symbol.for("IGetMeetingRepeatDaysController"),

    IGetMeetingsByRepeatingDayOfWeekUseCase: Symbol.for("IGetMeetingsByRepeatingDayOfWeekUseCase"),
    IGetMeetingsByRepeatingDayOfWeekController: Symbol.for("IGetMeetingsByRepeatingDayOfWeekController"),

    IMeetingExcludedDatesRepository: Symbol.for("IMeetingExcludedDatesRepository"),

    IGetMeetingExcludedDatesUseCase: Symbol.for("IGetMeetingExcludedDatesUseCase"),
    IGetMeetingExcludedDatesController: Symbol.for("IGetMeetingExcludedDatesController"),

    IGetMultipleMeetingsExcludedDatesForDateUseCase: Symbol.for("IGetMultipleMeetingsExcludedDatesForDateUseCase"),
    IGetMultipleMeetingsExcludedDatesForDateController: Symbol.for("IGetMultipleMeetingsExcludedDatesForDateController"),

    IMeetingDatesRepository: Symbol.for("IMeetingDatesRepository"),

    IGetMeetingDatesUseCase: Symbol.for("IGetMeetingDatesUseCase"),
    IGetMeetingDatesController: Symbol.for("IGetMeetingDatesController"),

    IGetMeetingDatesByStartDateUseCase: Symbol.for("IGetMeetingDatesByStartDateUseCase"),
    IGetMeetingDatesByStartDateController: Symbol.for("IGetMeetingDatesByStartDateController")
}

export interface MEETINGS_RETURN_TYPES {
    IMeetingsRepository: IMeetingsRepository,

    IGetMeetingsUseCase: IGetMeetingsUseCase,
    IGetMeetingsController: IGetMeetingsController,

    IGetFullMeetingByIdUseCase: IGetFullMeetingByIdUseCase,
    IGetFullMeetingByIdController: IGetFullMeetingByIdController,

    IGetMeetingByIdUseCase: IGetMeetingByIdUseCase,
    IGetMeetingByIdController: IGetMeetingByIdController,

    IAddMeetingUseCase: IAddMeetingUseCase,
    IAddMeetingController: IAddMeetingController,

    IRemoveMeetingUseCase: IRemoveMeetingUseCase,
    IRemoveMeetingController: IRemoveMeetingController,

    IUpdateMeetingUseCase: IUpdateMeetingUseCase,
    IUpdateMeetingController: IUpdateMeetingController,

    IMeetingRepeatDaysRepository: IMeetingRepeatDaysRepository,

    IGetMeetingRepeatDaysUseCase: IGetMeetingRepeatDaysUseCase,
    IGetMeetingRepeatDaysController: IGetMeetingRepeatDaysController,
    IGetMeetingsByRepeatingDayOfWeekUseCase: IGetMeetingsByRepeatingDayOfWeekUseCase,
    IGetMeetingsByRepeatingDayOfWeekController: IGetMeetingsByRepeatingDayOfWeekController,

    IMeetingExcludedDatesRepository: IMeetingExcludedDatesRepository,

    IGetMeetingExcludedDatesUseCase: IGetMeetingExcludedDatesUseCase,
    IGetMeetingExcludedDatesController: IGetMeetingExcludedDatesController,

    IGetMultipleMeetingsExcludedDatesForDateUseCase: IGetMultipleMeetingsExcludedDatesForDateUseCase,
    IGetMultipleMeetingsExcludedDatesForDateController: IGetMultipleMeetingsExcludedDatesForDateController

    IMeetingDatesRepository: IMeetingDatesRepository,

    IGetMeetingDatesUseCase: IGetMeetingDatesUseCase,
    IGetMeetingDatesController: IGetMeetingDatesController,

    IGetMeetingDatesByStartDateUseCase: IGetMeetingDatesByStartDateUseCase,
    IGetMeetingDatesByStartDateController: IGetMeetingDatesByStartDateController
}


