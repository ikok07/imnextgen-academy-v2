import {createContainer} from "@evyweb/ioctopus";
import {DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types/types";
import {createAuthenticationModule} from "@/di/modules/authentication.module";
import {createEmailsModule} from "@/di/modules/emails.module";
import {createAuthorizationModule} from "@/di/modules/authorization.module";
import {createTodosModule} from "@/di/modules/todos.module";
import {createProfilesModule} from "@/di/modules/profiles.module";
import {createSetupQuestionsModule} from "@/di/modules/setup-questions.module";
import {createClassroomModulesModule} from "@/di/modules/classroom-modules.module";
import {createClassroomFinishedVideosModule} from "@/di/modules/classroom-finished-videos.module";
import {createVideosModule} from "@/di/modules/classroom-videos.module";
import {createClassroomSectionsModule} from "@/di/modules/classroom-sections.module";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("AuthenticationModule"), createAuthenticationModule());
ApplicationContainer.load(Symbol("AuthorizationModule"), createAuthorizationModule());
ApplicationContainer.load(Symbol("EmailModule"), createEmailsModule());
ApplicationContainer.load(Symbol("TodosModule"), createTodosModule());
ApplicationContainer.load(Symbol("ProfilesModule"), createProfilesModule());
ApplicationContainer.load(Symbol("SetupQuestionsModule"), createSetupQuestionsModule());
ApplicationContainer.load(Symbol("ClassroomModulesModule"), createClassroomModulesModule());
ApplicationContainer.load(Symbol("ClassroomSectionsModule"), createClassroomSectionsModule());
ApplicationContainer.load(Symbol("ClassroomVideosModule"), createVideosModule());
ApplicationContainer.load(Symbol("ClassroomFinishedVideosModule"), createClassroomFinishedVideosModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}