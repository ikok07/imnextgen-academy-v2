import {IGetPaidModulesUseCase} from "@/src/application/use-cases/media/modules/get-paid-modules.use-case";

export type IGetPaidModulesController = ReturnType<typeof getPaidModulesController>;

export const getPaidModulesController = (
    getPaidModulesUseCase: IGetPaidModulesUseCase
) => async () => {
    return getPaidModulesUseCase();
}