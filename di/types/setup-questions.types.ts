import {ISetupQuestionsRepository} from "@/src/application/repositories/setup-questions.repository.interface";
import {IGetSetupQuestionsUseCase} from "@/src/application/use-cases/setup/get-setup-questions.use-case";
import {IGetSetupQuestionController} from "@/src/interface-adapters/controllers/setup/get-setup-questions.controller";
import {ISetUserSetupQuestionsUseCase} from "@/src/application/use-cases/setup/set-user-setup-questions.use-case";
import {
    ISetUserSetupQuestionsController
} from "@/src/interface-adapters/controllers/setup/set-user-setup-questions.controller";

export const SETUP_QUESTIONS_SYMBOLS = {
    ISetupQuestionsRepository: Symbol.for("ISetupQuestionsRepository"),

    IGetSetupQuestionsUseCase: Symbol.for("IGetSetupQuestionsUseCase"),
    IGetSetupQuestionController: Symbol.for("IGetSetupQuestionController"),

    ISetUserSetupQuestionsUseCase: Symbol.for("ISetUserSetupQuestionsUseCase"),
    ISetUserSetupQuestionsController: Symbol.for("ISetUserSetupQuestionsController")
}

export interface SETUP_QUESTIONS_RETURN_TYPES {
    ISetupQuestionsRepository: ISetupQuestionsRepository,

    IGetSetupQuestionsUseCase: IGetSetupQuestionsUseCase,
    IGetSetupQuestionController: IGetSetupQuestionController,

    ISetUserSetupQuestionsUseCase: ISetUserSetupQuestionsUseCase,
    ISetUserSetupQuestionsController: ISetUserSetupQuestionsController
}