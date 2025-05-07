import {ITestService} from "@/modules/test/src/application/services/test.service.interface";

export type ITestMethodUseCase = ReturnType<typeof testMethodUseCase>;

export const testMethodUseCase = (
    testService: ITestService
) => async () => {
    return testService.testMethod();
}