import {ITestService} from "@/modules/test/src/application/services/test.service.interface";
import { ITestMethodController } from "../../src/interface-adapters/controllers/test-method.controller";
import {ITestMethodUseCase} from "@/modules/test/src/application/use-cases/test-method.use-case";

export const TEST_SYMBOLS = {
    ITestService: Symbol.for("ITestService"),

    ITestMethodUseCase: Symbol.for("ITestMethodUseCase"),
    ITestMethodController: Symbol.for("ITestMethodController")
}

export interface TEST_RETURN_TYPES {
    ITestService: ITestService,

    ITestMethodUseCase: ITestMethodUseCase,
    ITestMethodController: ITestMethodController
}