import {ITestMethodUseCase} from "@/modules/test/src/application/use-cases/test-method.use-case";

export type ITestMethodController = ReturnType<typeof testMethodController>;

export const testMethodController = (
    testMethodUseCase: ITestMethodUseCase
) => async () => {
    return testMethodUseCase();
}