import {IGetModulesUseCase} from "@/src/application/use-cases/media/modules/get-modules.use-case";

export type IGetModulesController = ReturnType<typeof getModulesController>;

export const getModulesController = (
    getModulesUseCase: IGetModulesUseCase
) => async () => {
    return getModulesUseCase();
}