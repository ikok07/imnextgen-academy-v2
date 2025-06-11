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
import {IGetFullRegularMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-regular-meeting-by-id-use.case";
import { IGetFullRegularMeetingByIdController } from "@/src/interface-adapters/controllers/meetings/get-full-regular-meeting-by-id.controller";
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
import {
    IGetSignedUpUsersForMeetingUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-users-for-meeting.use-case";
import {
    IGetSignedUpUsersForMeetingController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/get-signed-up-users-for-meeting.controller";
import {
    IGetSignedUpUserForMeetingUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-user-for-meeting.use-case";
import {
    IGetSignedUpUserForMeetingController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/get-signed-up-user-for-meeting.controller";
import {
    IAddSignedUpUserController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/add-signed-up-user.controller";
import {
    IAddSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/add-signed-up-user.use-case";
import {
    IRemoveSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/remove-signed-up-user.use-case";
import {
    IRemoveSignedUpUserController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/remove-signed-up-user.controller";
import {
    IMeetingSignedUpUsersRepository
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {
    IGetSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";
import {
    IGetSpecificMeetingsByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-specific-meetings-by-user-id.controller";
import {
    IAddUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/add-user-specific-meeting.use-case";
import {
    IAddUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/add-user-specific-meeting.controller";
import {
    IUpdateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";
import {
    IUpdateUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/update-user-specific-meeting.controller";
import {
    IRemoveUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/remove-user-specific-meeting.use-case";
import {
    IRemoveUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/remove-user-specific-meeting.controller";
import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {
    IGetSpecificMeetingsByMentorProfileIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-specific-meetings-by-mentor-profile-id.controller";
import {
    IGetSpecificMeetingsByMentorProfileIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-mentor-profile-id.use-case";
import {
    IMentorSchedulesRepository
} from "@/src/application/repositories/meetings/mentor-schedules.repository.interface";
import {
    IGetMentorSchedulesUseCase
} from "@/src/application/use-cases/meetings/mentor-schedules/get-mentor-schedules.use-case";
import {
    IGetMentorSchedulesController
} from "@/src/interface-adapters/controllers/meetings/mentor-schedules/get-mentor-schedules.controller";
import {
    ISystemUpdateUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/system-update-user-specific-meeting.controller";
import {
    IGetFullSpecificMeetingByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-full-specific-meeting-by-user-id.controller";
import {
    IGetFullSpecificMeetingByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-full-specific-meeting-by-user-id.use-case";
import {
    ISystemGetUserSpecificMeetingsByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/system-get-user-specific-meetings-by-user-id.controller";

export const MEETINGS_SYMBOLS = {
    IMeetingsRepository: Symbol.for("IMeetingsRepository"),

    IGetMeetingsUseCase: Symbol.for("IGetMeetingsUseCase"),
    IGetMeetingsController: Symbol.for("IGetMeetingsController"),

    IGetFullRegularMeetingByIdUseCase: Symbol.for("IGetFullRegularMeetingByIdUseCase"),
    IGetFullRegularMeetingByIdController: Symbol.for("IGetFullRegularMeetingByIdController"),

    IGetFullSpecificMeetingByUserIdUseCase: Symbol.for("IGetFullSpecificMeetingByUserIdUseCase"),
    IGetFullSpecificMeetingByUserIdController: Symbol.for("IGetFullSpecificMeetingByUserIdController"),

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
    IGetMeetingDatesByStartDateController: Symbol.for("IGetMeetingDatesByStartDateController"),

    IMeetingSignedUpUsersRepository: Symbol.for("IMeetingSignedUpUsersRepository"),

    IGetSignedUpUsersForMeetingUseCase: Symbol.for("IGetSignedUpUsersForMeetingUseCase"),
    IGetSignedUpUsersForMeetingController: Symbol.for("IGetSignedUpUsersForMeetingController"),

    IGetSignedUpUserForMeetingUseCase: Symbol.for("IGetSignedUpUserForMeetingUseCase"),
    IGetSignedUpUserForMeetingController: Symbol.for("IGetSignedUpUserForMeetingController"),

    IAddSignedUpUserUseCase: Symbol.for("IAddSignedUpUserUseCase"),
    IAddSignedUpUserController: Symbol.for("IAddSignedUpUserController"),

    IRemoveSignedUpUserUseCase: Symbol.for("IRemoveSignedUpUserUseCase"),
    IRemoveSignedUpUserController: Symbol.for('IRemoveSignedUpUserController'),

    IUserSpecificMeetingsRepository: Symbol.for("IUserSpecificMeetingsRepository"),

    IGetSpecificMeetingsByUserIdUseCase: Symbol.for("IGetSpecificMeetingsByUserIdUseCase"),
    IGetSpecificMeetingsByUserIdController: Symbol.for("IGetSpecificMeetingsByUserIdController"),

    IGetSpecificMeetingsByMentorProfileIdUseCase: Symbol.for("IGetSpecificMeetingsByMentorProfileIdUseCase"),
    IGetSpecificMeetingsByMentorProfileIdController: Symbol.for("IGetSpecificMeetingsByMentorProfileIdController"),
    ISystemGetUserSpecificMeetingsByUserIdController: Symbol.for("ISystemGetUserSpecificMeetingsByUserIdController"),

    IAddUserSpecificMeetingUseCase: Symbol.for("IAddUserSpecificMeetingUseCase"),
    IAddUserSpecificMeetingController: Symbol.for("IAddUserSpecificMeetingController"),

    IUpdateUserSpecificMeetingUseCase: Symbol.for("IUpdateUserSpecificMeetingUseCase"),
    IUpdateUserSpecificMeetingController: Symbol.for("IUpdateUserSpecificMeetingController"),
    ISystemUpdateUserSpecificMeetingController: Symbol.for("ISystemUpdateUserSpecificMeetingController"),

    IRemoveUserSpecificMeetingUseCase: Symbol.for("IRemoveUserSpecificMeetingUseCase"),
    IRemoveUserSpecificMeetingController: Symbol.for("IRemoveUserSpecificMeetingController"),

    IMentorSchedulesRepository: Symbol.for("IMentorSchedulesRepository"),

    IGetMentorSchedulesUseCase: Symbol.for("IGetMentorSchedulesUseCase"),
    IGetMentorSchedulesController: Symbol.for("IGetMentorSchedulesController")
}

export interface MEETINGS_RETURN_TYPES {
    IMeetingsRepository: IMeetingsRepository,

    IGetMeetingsUseCase: IGetMeetingsUseCase,
    IGetMeetingsController: IGetMeetingsController,

    IGetFullRegularMeetingByIdUseCase: IGetFullRegularMeetingByIdUseCase,
    IGetFullRegularMeetingByIdController: IGetFullRegularMeetingByIdController,

    IGetFullSpecificMeetingByUserIdUseCase: IGetFullSpecificMeetingByUserIdUseCase,
    IGetFullSpecificMeetingByUserIdController: IGetFullSpecificMeetingByUserIdController

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
    IGetMultipleMeetingsExcludedDatesForDateController: IGetMultipleMeetingsExcludedDatesForDateController,

    IMeetingDatesRepository: IMeetingDatesRepository,

    IGetMeetingDatesUseCase: IGetMeetingDatesUseCase,
    IGetMeetingDatesController: IGetMeetingDatesController,

    IGetMeetingDatesByStartDateUseCase: IGetMeetingDatesByStartDateUseCase,
    IGetMeetingDatesByStartDateController: IGetMeetingDatesByStartDateController,

    IMeetingSignedUpUsersRepository: IMeetingSignedUpUsersRepository,

    IGetSignedUpUsersForMeetingUseCase: IGetSignedUpUsersForMeetingUseCase,
    IGetSignedUpUsersForMeetingController: IGetSignedUpUsersForMeetingController,

    IGetSignedUpUserForMeetingUseCase: IGetSignedUpUserForMeetingUseCase,
    IGetSignedUpUserForMeetingController: IGetSignedUpUserForMeetingController,

    IAddSignedUpUserUseCase: IAddSignedUpUserUseCase
    IAddSignedUpUserController: IAddSignedUpUserController,

    IRemoveSignedUpUserUseCase: IRemoveSignedUpUserUseCase,
    IRemoveSignedUpUserController: IRemoveSignedUpUserController,

    IUserSpecificMeetingsRepository: IUserSpecificMeetingsRepository,

    IGetSpecificMeetingsByUserIdUseCase: IGetSpecificMeetingsByUserIdUseCase,
    IGetSpecificMeetingsByUserIdController: IGetSpecificMeetingsByUserIdController,

    IGetSpecificMeetingsByMentorProfileIdUseCase: IGetSpecificMeetingsByMentorProfileIdUseCase,
    IGetSpecificMeetingsByMentorProfileIdController: IGetSpecificMeetingsByMentorProfileIdController,
    ISystemGetUserSpecificMeetingsByUserIdController: ISystemGetUserSpecificMeetingsByUserIdController,

    IAddUserSpecificMeetingUseCase: IAddUserSpecificMeetingUseCase,
    IAddUserSpecificMeetingController: IAddUserSpecificMeetingController,

    IUpdateUserSpecificMeetingUseCase: IUpdateUserSpecificMeetingUseCase,
    IUpdateUserSpecificMeetingController: IUpdateUserSpecificMeetingController,
    ISystemUpdateUserSpecificMeetingController: ISystemUpdateUserSpecificMeetingController,

    IRemoveUserSpecificMeetingUseCase: IRemoveUserSpecificMeetingUseCase,
    IRemoveUserSpecificMeetingController: IRemoveUserSpecificMeetingController,

    IMentorSchedulesRepository: IMentorSchedulesRepository,

    IGetMentorSchedulesUseCase: IGetMentorSchedulesUseCase,
    IGetMentorSchedulesController: IGetMentorSchedulesController
}


