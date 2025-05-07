import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/modules/test/di/types/types";
import {TestService} from "@/modules/test/src/infrastructure/services/test.service";
import {testMethodUseCase} from "@/modules/test/src/application/use-cases/test-method.use-case";
import {testMethodController} from "@/modules/test/src/interface-adapters/controllers/test-method.controller";

export function createTestModule() {
    const testModule = createModule();

    testModule
        .bind(DI_SYMBOLS.ITestService)
        .toClass(TestService);

    testModule
        .bind(DI_SYMBOLS.ITestMethodUseCase)
        .toHigherOrderFunction(testMethodUseCase, [DI_SYMBOLS.ITestService]);

    testModule
        .bind(DI_SYMBOLS.ITestMethodController)
        .toHigherOrderFunction(testMethodController, [DI_SYMBOLS.ITestMethodUseCase]);

    return testModule;
}