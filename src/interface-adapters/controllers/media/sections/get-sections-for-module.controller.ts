import {
    IGetSectionsForModuleUseCase
} from "@/src/application/use-cases/media/sections/get-sections-for-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSectionsForModuleController = ReturnType<typeof getSectionsForModuleController>;

export const getSectionsForModuleController = (
    getSectionsForModuleUseCase: IGetSectionsForModuleUseCase
) => async (moduleId: string | undefined | null) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return getSectionsForModuleUseCase(moduleId);
}