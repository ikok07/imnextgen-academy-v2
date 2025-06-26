import {
    IDeleteMultipleModulesUseCase
} from "@/src/application/use-cases/media/modules/delete-multiple-modules.use-case";

export type IDeleteMultipleModulesController = ReturnType<typeof deleteMultipleModulesController>;

export const deleteMultipleModulesController = (
    deleteMultipleModulesUseCase: IDeleteMultipleModulesUseCase
) => async (moduleIds: string[]) => {

    if (moduleIds.length === 0) return;

    return deleteMultipleModulesUseCase(moduleIds);
}