import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {SetupQuestionsRepository} from "@/src/infrastructure/repositories/setup/setup-questions.repository";
import {
    getSetupQuestionsUseCase
} from "@/src/application/use-cases/setup/get-setup-questions.use-case";
import {
    getSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/get-setup-questions.controller";
import {setUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/set-user-setup-questions.use-case";
import {
    setUserSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/set-user-setup-questions.controller";
import {getUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/get-user-setup-questions.use-case";
import {
    getUserSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/get-user-setup-questions.controller";

export function createSetupQuestionsModule() {
    const setupQuestionsModule = createModule();

    setupQuestionsModule
        .bind(DI_SYMBOLS.ISetupQuestionsRepository)
        .toClass(SetupQuestionsRepository);

    setupQuestionsModule
        .bind(DI_SYMBOLS.IGetSetupQuestionsUseCase)
        .toHigherOrderFunction(getSetupQuestionsUseCase, [DI_SYMBOLS.ISetupQuestionsRepository]);

    setupQuestionsModule
        .bind(DI_SYMBOLS.IGetSetupQuestionController)
        .toHigherOrderFunction(getSetupQuestionsController, [DI_SYMBOLS.IGetSetupQuestionsUseCase]);

    setupQuestionsModule
        .bind(DI_SYMBOLS.IGetUserSetupQuestionsUseCase)
        .toHigherOrderFunction(getUserSetupQuestionsUseCase, [DI_SYMBOLS.ISetupQuestionsRepository]);

    setupQuestionsModule
        .bind(DI_SYMBOLS.IGetUserSetupQuestionsController)
        .toHigherOrderFunction(getUserSetupQuestionsController, [DI_SYMBOLS.IGetUserSetupQuestionsUseCase]);

    setupQuestionsModule
        .bind(DI_SYMBOLS.ISetUserSetupQuestionsUseCase)
        .toHigherOrderFunction(setUserSetupQuestionsUseCase, [DI_SYMBOLS.ISetupQuestionsRepository]);

    setupQuestionsModule
        .bind(DI_SYMBOLS.ISetUserSetupQuestionsController)
        .toHigherOrderFunction(setUserSetupQuestionsController, [DI_SYMBOLS.ISetUserSetupQuestionsUseCase]);

    return setupQuestionsModule;
}