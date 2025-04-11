import {createContainer} from "@evyweb/ioctopus";
import {DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types/types";
import {createAuthenticationModule} from "@/di/modules/authentication.module";
import {createEmailsModule} from "@/di/modules/emails.module";
import {createAuthorizationModule} from "@/di/modules/authorization.module";
import {createTodosModule} from "@/di/modules/todos.module";
import {createProfilesModule} from "@/di/modules/profiles.module";
import {createSetupQuestionsModule} from "@/di/modules/setup-questions.module";

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol("AuthenticationModule"), createAuthenticationModule());
ApplicationContainer.load(Symbol("AuthorizationModule"), createAuthorizationModule());
ApplicationContainer.load(Symbol("EmailModule"), createEmailsModule());
ApplicationContainer.load(Symbol("TodosModule"), createTodosModule());
ApplicationContainer.load(Symbol("ProfilesModule"), createProfilesModule());
ApplicationContainer.load(Symbol("SetupQuestions"), createSetupQuestionsModule());

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}