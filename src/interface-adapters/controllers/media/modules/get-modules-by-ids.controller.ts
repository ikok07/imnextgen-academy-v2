import {IGetModulesByIdsUseCase} from "@/src/application/use-cases/media/modules/get-modules-by-ids.use-case";

export type IGetModulesByIdsController = ReturnType<typeof getModulesByIdsController>;

export const getModulesByIdsController = (
    getModulesByIdsUseCase: IGetModulesByIdsUseCase
) => async (ids: string[]) => {

    if (ids.length === 0) return [];

    return getModulesByIdsUseCase(ids);
}