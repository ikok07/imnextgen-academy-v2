import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {MeetingsRepository} from "@/src/infrastructure/repositories/meetings/meetings.repository";
import {getMeetingsUseCase} from "@/src/application/use-cases/meetings/get-meetings.use-case";
import {getMeetingsController} from "@/src/interface-adapters/controllers/meetings/get-meetings.controller";
import {getMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-meeting-by-id.use-case";
import {getMeetingByIdController} from "@/src/interface-adapters/controllers/meetings/get-meeting-by-id.controller";
import {addMeetingController} from "@/src/interface-adapters/controllers/meetings/add-meeting.controller";
import {addMeetingUseCase} from "@/src/application/use-cases/meetings/add-meeting.use-case";
import {removeMeetingUseCase} from "@/src/application/use-cases/meetings/remove-meeting.use-case";
import {updateMeetingUseCase} from "@/src/application/use-cases/meetings/update-meeting.use-case";
import {updateMeetingController} from "@/src/interface-adapters/controllers/meetings/update-meeting.controller";
import {removeMeetingController} from "@/src/interface-adapters/controllers/meetings/remove-meeting.controller";
import {
    getMeetingRepeatDaysUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meeting-repeat-days.use-case";
import {MeetingRepeatDaysRepository} from "@/src/infrastructure/repositories/meetings/meeting-repeat-days.repository";
import {
    getMeetingRepeatDaysController
} from "@/src/interface-adapters/controllers/meetings/meeting-repeat-days/get-meeting-repeat-days.controller";
import {
    MeetingExcludedDatesRepository
} from "@/src/infrastructure/repositories/meetings/meeting-excluded-dates.repository";
import {
    getMeetingExcludedDatesUseCase
} from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-meeting-excluded-dates.use-case";
import {getMeetingDatesUseCase} from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates.use-case";
import {MeetingDatesRepository} from "@/src/infrastructure/repositories/meetings/meeting-dates.repository";
import { getMeetingExcludedDatesController } from "@/src/interface-adapters/controllers/meetings/meeting-excluded-dates/get-meeting-excluded-dates.controller";
import { getMeetingDatesController } from "@/src/interface-adapters/controllers/meetings/meeting-dates/get-meeting-dates.controller";
import {getFullRegularMeetingByIdUseCase} from "@/src/application/use-cases/meetings/get-full-regular-meeting-by-id-use.case";
import {
    getFullRegularMeetingByIdController
} from "@/src/interface-adapters/controllers/meetings/get-full-regular-meeting-by-id.controller";
import {
    getMeetingsByRepeatingDayOfWeekUseCase
} from "@/src/application/use-cases/meetings/meeting-repeat-days/get-meetings-by-repeating-day-of-week.use-case";
import {
    getMeetingsByRepeatingDayOfWeekController
} from "@/src/interface-adapters/controllers/meetings/meeting-repeat-days/get-meetings-by-repeating-day-of-week.controller";
import {
    getMeetingDatesByStartDateController
} from "@/src/interface-adapters/controllers/meetings/meeting-dates/get-meeting-dates-by-start-date.controller";
import {
    getMeetingDatesByStartDateUseCase
} from "@/src/application/use-cases/meetings/meeting-dates/get-meeting-dates-by-start-date.use-case";
import {
    getMultipleMeetingsExcludedDatesForDateUseCase
} from "@/src/application/use-cases/meetings/meeting-exluded-dates/get-multiple-meetings-excluded-dates-for-date.use-case";
import {
    getMultipleMeetingsExcludedDatesForDateController
} from "@/src/interface-adapters/controllers/meetings/meeting-excluded-dates/get-multiple-meetings-excluded-dates-for-date.controller";
import {
    MeetingSignedUpUsersRepository
} from "@/src/infrastructure/repositories/meetings/meeting-signed-up-users.repository";
import {
    getSignedUpUsersForMeetingUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-users-for-meeting.use-case";
import {
    getSignedUpUsersForMeetingController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/get-signed-up-users-for-meeting.controller";
import { getSignedUpUserForMeetingUseCase } from "@/src/application/use-cases/meetings/meeting-signed-up-users/get-signed-up-user-for-meeting.use-case";
import {
    getSignedUpUserForMeetingController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/get-signed-up-user-for-meeting.controller";
import {
    addSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/add-signed-up-user.use-case";
import {
    addSignedUpUserController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/add-signed-up-user.controller";
import {
    removeSignedUpUserUseCase
} from "@/src/application/use-cases/meetings/meeting-signed-up-users/remove-signed-up-user.use-case";
import {
    removeSignedUpUserController
} from "@/src/interface-adapters/controllers/meetings/meeting-signed-up-users/remove-signed-up-user.controller";
import {
    getSpecificMeetingsByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-user-id.use-case";
import {
    getSpecificMeetingsByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-specific-meetings-by-user-id.controller";
import {
    addUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/add-user-specific-meeting.use-case";
import {
    addUserSpecificMeetingController, IAddUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/add-user-specific-meeting.controller";
import {
    updateUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/update-user-specific-meeting.use-case";
import {
    updateUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/update-user-specific-meeting.controller";
import {
    removeUserSpecificMeetingUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/remove-user-specific-meeting.use-case";
import {
    IRemoveUserSpecificMeetingController,
    removeUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/remove-user-specific-meeting.controller";
import {
    IUserSpecificMeetingsRepository
} from "@/src/application/repositories/meetings/user-specific-meetings.repository.interface";
import {
    UserSpecificMeetingsRepository
} from "@/src/infrastructure/repositories/meetings/user-specific-meetings.repository";
import {
    getSpecificMeetingsByMentorProfileIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-specific-meetings-by-mentor-profile-id.use-case";
import {
    getSpecificMeetingsByMentorProfileIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-specific-meetings-by-mentor-profile-id.controller";
import {IGetUserController} from "@/src/interface-adapters/controllers/auth/get-user.controller";
import {ICheckAccessController} from "@/src/interface-adapters/controllers/auth/check-access.controller";
import {MentorSchedulesRepository} from "@/src/infrastructure/repositories/meetings/mentor-schedules.repository";
import {
    getMentorSchedulesUseCase
} from "@/src/application/use-cases/meetings/mentor-schedules/get-mentor-schedules.use-case";
import {
    getMentorSchedulesController
} from "@/src/interface-adapters/controllers/meetings/mentor-schedules/get-mentor-schedules.controller";
import {
    ICheckResourcesAccessController
} from "@/src/interface-adapters/controllers/auth/check-resources-access.controller";
import {
    systemUpdateUserSpecificMeetingController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/system-update-user-specific-meeting.controller";
import {
    getFullSpecificMeetingByUserIdUseCase
} from "@/src/application/use-cases/meetings/user-specific-meetings/get-full-specific-meeting-by-user-id.use-case";
import {
    getFullSpecificMeetingByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/get-full-specific-meeting-by-user-id.controller";
import {
    ISystemGetUserSpecificMeetingsByUserIdController, systemGetUserSpecificMeetingsByUserIdController
} from "@/src/interface-adapters/controllers/meetings/user-specific-meeings/system-get-user-specific-meetings-by-user-id.controller";
import {
    bookSalesMeetingController,
    IBookSalesMeetingController
} from "@/src/interface-adapters/controllers/meetings/sales-meetings/book-sales-meeting.controller";
import {
    IGetUserSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/get-user-setup-questions.controller";
import {
    ICreateCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/create-calendar-event.controller";
import {
    IGetCalendarIdByUserIdController
} from "@/src/interface-adapters/controllers/calendar/calendar-ids/get-calendar-id-by-user-id.controller";
import {
    IDeleteCalendarEventController
} from "@/src/interface-adapters/controllers/calendar/delete-calendar-event.controller";
import {
    IStartSalesMeetingAutomationController
} from "@/src/interface-adapters/controllers/automations/start-sales-meeting-automation.controller";
import {
    IGetCalendarEventsController
} from "@/src/interface-adapters/controllers/calendar/get-calendar-events.controller";
import {
    unbookSalesMeetingController
} from "@/src/interface-adapters/controllers/meetings/sales-meetings/unbook-sales-meeting.controller";

export function createMeetingsModule() {
    const meetingsModule = createModule();

    meetingsModule
        .bind(DI_SYMBOLS.IMeetingsRepository)
        .toClass(MeetingsRepository);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingsUseCase)
        .toHigherOrderFunction(getMeetingsUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingsController)
        .toHigherOrderFunction(getMeetingsController, [DI_SYMBOLS.IGetMeetingsUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetFullRegularMeetingByIdUseCase)
        .toHigherOrderFunction(getFullRegularMeetingByIdUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetFullRegularMeetingByIdController)
        .toHigherOrderFunction(getFullRegularMeetingByIdController, [DI_SYMBOLS.IGetFullRegularMeetingByIdUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetFullSpecificMeetingByUserIdUseCase)
        .toHigherOrderFunction(getFullSpecificMeetingByUserIdUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetFullSpecificMeetingByUserIdController)
        .toHigherOrderFunction(getFullSpecificMeetingByUserIdController, [DI_SYMBOLS.IGetFullSpecificMeetingByUserIdUseCase, DI_SYMBOLS.IGetUserUseCase, DI_SYMBOLS.ICheckResourcesAccessUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingByIdUseCase)
        .toHigherOrderFunction(getMeetingByIdUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingByIdController)
        .toHigherOrderFunction(getMeetingByIdController, [DI_SYMBOLS.IGetMeetingByIdUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddMeetingUseCase)
        .toHigherOrderFunction(addMeetingUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddMeetingController)
        .toHigherOrderFunction(addMeetingController, [DI_SYMBOLS.IAddMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveMeetingUseCase)
        .toHigherOrderFunction(removeMeetingUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveMeetingController)
        .toHigherOrderFunction(removeMeetingController, [DI_SYMBOLS.IRemoveMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IUpdateMeetingUseCase)
        .toHigherOrderFunction(updateMeetingUseCase, [DI_SYMBOLS.IMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IUpdateMeetingController)
        .toHigherOrderFunction(updateMeetingController, [DI_SYMBOLS.IUpdateMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IMeetingRepeatDaysRepository)
        .toClass(MeetingRepeatDaysRepository);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingRepeatDaysUseCase)
        .toHigherOrderFunction(getMeetingRepeatDaysUseCase, [DI_SYMBOLS.IMeetingRepeatDaysRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingRepeatDaysController)
        .toHigherOrderFunction(getMeetingRepeatDaysController, [DI_SYMBOLS.IGetMeetingRepeatDaysUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingsByRepeatingDayOfWeekUseCase)
        .toHigherOrderFunction(getMeetingsByRepeatingDayOfWeekUseCase, [DI_SYMBOLS.IMeetingRepeatDaysRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingsByRepeatingDayOfWeekController)
        .toHigherOrderFunction(getMeetingsByRepeatingDayOfWeekController, [DI_SYMBOLS.IGetMeetingsByRepeatingDayOfWeekUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IMeetingExcludedDatesRepository)
        .toClass(MeetingExcludedDatesRepository)

    meetingsModule
        .bind(DI_SYMBOLS.IGetMultipleMeetingsExcludedDatesForDateUseCase)
        .toHigherOrderFunction(getMultipleMeetingsExcludedDatesForDateUseCase, [DI_SYMBOLS.IMeetingExcludedDatesRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMultipleMeetingsExcludedDatesForDateController)
        .toHigherOrderFunction(getMultipleMeetingsExcludedDatesForDateController, [DI_SYMBOLS.IGetMultipleMeetingsExcludedDatesForDateUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingExcludedDatesUseCase)
        .toHigherOrderFunction(getMeetingExcludedDatesUseCase, [DI_SYMBOLS.IMeetingExcludedDatesRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingExcludedDatesController)
        .toHigherOrderFunction(getMeetingExcludedDatesController, [DI_SYMBOLS.IGetMeetingExcludedDatesUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IMeetingDatesRepository)
        .toClass(MeetingDatesRepository)

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingDatesUseCase)
        .toHigherOrderFunction(getMeetingDatesUseCase, [DI_SYMBOLS.IMeetingDatesRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingDatesController)
        .toHigherOrderFunction(getMeetingDatesController, [DI_SYMBOLS.IGetMeetingDatesUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingDatesByStartDateUseCase)
        .toHigherOrderFunction(getMeetingDatesByStartDateUseCase, [DI_SYMBOLS.IMeetingDatesRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMeetingDatesByStartDateController)
        .toHigherOrderFunction(getMeetingDatesByStartDateController, [DI_SYMBOLS.IGetMeetingDatesByStartDateUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IMeetingSignedUpUsersRepository)
        .toClass(MeetingSignedUpUsersRepository);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSignedUpUsersForMeetingUseCase)
        .toHigherOrderFunction(getSignedUpUsersForMeetingUseCase, [DI_SYMBOLS.IMeetingSignedUpUsersRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSignedUpUsersForMeetingController)
        .toHigherOrderFunction(getSignedUpUsersForMeetingController, [DI_SYMBOLS.IGetSignedUpUsersForMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSignedUpUserForMeetingUseCase)
        .toHigherOrderFunction(getSignedUpUserForMeetingUseCase, [DI_SYMBOLS.IMeetingSignedUpUsersRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSignedUpUserForMeetingController)
        .toHigherOrderFunction(getSignedUpUserForMeetingController, [DI_SYMBOLS.IGetSignedUpUserForMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddSignedUpUserUseCase)
        .toHigherOrderFunction(addSignedUpUserUseCase, [DI_SYMBOLS.IMeetingSignedUpUsersRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddSignedUpUserController)
        .toHigherOrderFunction(addSignedUpUserController, [DI_SYMBOLS.IAddSignedUpUserUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveSignedUpUserUseCase)
        .toHigherOrderFunction(removeSignedUpUserUseCase, [DI_SYMBOLS.IMeetingSignedUpUsersRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveSignedUpUserController)
        .toHigherOrderFunction(removeSignedUpUserController, [DI_SYMBOLS.IRemoveSignedUpUserUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IUserSpecificMeetingsRepository)
        .toClass(UserSpecificMeetingsRepository);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSpecificMeetingsByUserIdUseCase)
        .toHigherOrderFunction(getSpecificMeetingsByUserIdUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSpecificMeetingsByMentorProfileIdUseCase)
        .toHigherOrderFunction(getSpecificMeetingsByMentorProfileIdUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSpecificMeetingsByMentorProfileIdController)
        .toHigherOrderFunction(getSpecificMeetingsByMentorProfileIdController, [DI_SYMBOLS.IGetSpecificMeetingsByMentorProfileIdUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckResourcesAccessController]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetSpecificMeetingsByUserIdController)
        .toHigherOrderFunction(getSpecificMeetingsByUserIdController, [DI_SYMBOLS.IGetSpecificMeetingsByUserIdUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckResourcesAccessController]);

    meetingsModule
        .bind(DI_SYMBOLS.ISystemGetUserSpecificMeetingsByUserIdController)
        .toHigherOrderFunction(systemGetUserSpecificMeetingsByUserIdController, [DI_SYMBOLS.IGetSpecificMeetingsByUserIdUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddUserSpecificMeetingUseCase)
        .toHigherOrderFunction(addUserSpecificMeetingUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IAddUserSpecificMeetingController)
        .toHigherOrderFunction(addUserSpecificMeetingController, [DI_SYMBOLS.IAddUserSpecificMeetingUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckAccessController]);

    meetingsModule
        .bind(DI_SYMBOLS.IUpdateUserSpecificMeetingUseCase)
        .toHigherOrderFunction(updateUserSpecificMeetingUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IUpdateUserSpecificMeetingController)
        .toHigherOrderFunction(updateUserSpecificMeetingController, [DI_SYMBOLS.IUpdateUserSpecificMeetingUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckAccessController]);

    meetingsModule
        .bind(DI_SYMBOLS.ISystemUpdateUserSpecificMeetingController)
        .toHigherOrderFunction(systemUpdateUserSpecificMeetingController, [DI_SYMBOLS.IUpdateUserSpecificMeetingUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveUserSpecificMeetingUseCase)
        .toHigherOrderFunction(removeUserSpecificMeetingUseCase, [DI_SYMBOLS.IUserSpecificMeetingsRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IRemoveUserSpecificMeetingController)
        .toHigherOrderFunction(removeUserSpecificMeetingController, [DI_SYMBOLS.IRemoveUserSpecificMeetingUseCase, DI_SYMBOLS.IGetUserController, DI_SYMBOLS.ICheckAccessController]);

    meetingsModule
        .bind(DI_SYMBOLS.IMentorSchedulesRepository)
        .toClass(MentorSchedulesRepository);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMentorSchedulesUseCase)
        .toHigherOrderFunction(getMentorSchedulesUseCase, [DI_SYMBOLS.IMentorSchedulesRepository]);

    meetingsModule
        .bind(DI_SYMBOLS.IGetMentorSchedulesController)
        .toHigherOrderFunction(getMentorSchedulesController, [DI_SYMBOLS.IGetMentorSchedulesUseCase]);

    meetingsModule
        .bind(DI_SYMBOLS.IBookSalesMeetingController)
        .toHigherOrderFunction(
            bookSalesMeetingController,
            [
                DI_SYMBOLS.IGetUserSetupQuestionsController,
                DI_SYMBOLS.ICreateCalendarEventController,
                DI_SYMBOLS.IGetCalendarIdByUserIdController,
                DI_SYMBOLS.IAddUserSpecificMeetingController,
                DI_SYMBOLS.IDeleteCalendarEventController,
                DI_SYMBOLS.IStartSalesMeetingAutomationController
            ]
        )

    meetingsModule
        .bind(DI_SYMBOLS.IUnbookSalesMeetingController)
        .toHigherOrderFunction(
            unbookSalesMeetingController,
            [
                DI_SYMBOLS.IGetCalendarEventsController,
                DI_SYMBOLS.IDeleteCalendarEventController,
                DI_SYMBOLS.IRemoveUserSpecificMeetingController
            ]
        )

    return meetingsModule;
}