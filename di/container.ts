import {Container, createContainer} from "@evyweb/ioctopus";
import {DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types/types";
import {createAuthenticationModule} from "@/di/modules/authentication.module";
import {createEmailsModule} from "@/di/modules/emails.module";
import {createAuthorizationModule} from "@/di/modules/authorization.module";
import {createProfilesModule} from "@/di/modules/profiles.module";
import {createSetupQuestionsModule} from "@/di/modules/setup-questions.module";
import {createClassroomModulesModule} from "@/di/modules/classroom-modules.module";
import {createClassroomFinishedVideosModule} from "@/di/modules/classroom-finished-videos.module";
import {createVideosModule} from "@/di/modules/classroom-videos.module";
import {createClassroomSectionsModule} from "@/di/modules/classroom-sections.module";
import {createJwtModule} from "@/di/modules/jwt.module";
import { createSubscriptionsModule } from "./modules/subscriptions.module";
import {createUserBoughtModulesModule} from "@/di/modules/user-bought-modules.module";
import { createMeetingsModule } from "./modules/meetings.module";
import {createPaymentsModule} from "@/di/modules/payments.module";
import {createDskModule} from "@/di/modules/dsk.module";
import {createBankOrdersModule} from "@/di/modules/bank-orders.module";
import {createBackendKeysModule} from "@/di/modules/backend-keys.module";
import {createCalendarModule} from "@/di/modules/calendar.module";
import {createGoogleNotificationChannelsModule} from "@/di/modules/google-notification-channels.module";
import {createAutomationsModule} from "@/di/modules/automations.module";
import {createStorageModule} from "@/di/modules/storage.module";
import {createVideoDescriptionsModule} from "@/di/modules/video-descriptions.module";
import {createVideoResourcesModule} from "@/di/modules/video-resources.module";

function loadExternalModules(container: Container) {}

const ApplicationContainer = createContainer();

loadExternalModules(ApplicationContainer);
ApplicationContainer.load(Symbol("AuthenticationModule"), createAuthenticationModule());
ApplicationContainer.load(Symbol("AuthorizationModule"), createAuthorizationModule());
ApplicationContainer.load(Symbol("EmailModule"), createEmailsModule());
ApplicationContainer.load(Symbol("ProfilesModule"), createProfilesModule());
ApplicationContainer.load(Symbol("SetupQuestionsModule"), createSetupQuestionsModule());
ApplicationContainer.load(Symbol("ClassroomModulesModule"), createClassroomModulesModule());
ApplicationContainer.load(Symbol("ClassroomSectionsModule"), createClassroomSectionsModule());
ApplicationContainer.load(Symbol("ClassroomVideosModule"), createVideosModule());
ApplicationContainer.load(Symbol("ClassroomFinishedVideosModule"), createClassroomFinishedVideosModule());
ApplicationContainer.load(Symbol("JwtModule"), createJwtModule());
ApplicationContainer.load(Symbol("SubscriptionsModule"), createSubscriptionsModule());
ApplicationContainer.load(Symbol("UserBoughtModulesModule"), createUserBoughtModulesModule());
ApplicationContainer.load(Symbol("MeetingsModule"), createMeetingsModule());
ApplicationContainer.load(Symbol("PaymentsModule"), createPaymentsModule());
ApplicationContainer.load(Symbol("DskModule"), createDskModule());
ApplicationContainer.load(Symbol("BankOrdersModule"), createBankOrdersModule());
ApplicationContainer.load(Symbol("BackendKeysModule"), createBackendKeysModule());
ApplicationContainer.load(Symbol("CalendarModule"), createCalendarModule());
ApplicationContainer.load(Symbol("GoogleNotificationChannelsModule"), createGoogleNotificationChannelsModule());
ApplicationContainer.load(Symbol("AutomationsModule"), createAutomationsModule());
ApplicationContainer.load(Symbol("StorageModule"), createStorageModule());
ApplicationContainer.load(Symbol("VideoDescriptions"), createVideoDescriptionsModule());
ApplicationContainer.load(Symbol("VideoResources"), createVideoResourcesModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}