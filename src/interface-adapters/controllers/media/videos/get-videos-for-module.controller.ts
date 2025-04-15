import {IGetVideosForModuleUseCase} from "@/src/application/use-cases/media/videos/get-videos-for-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideosForModuleController = ReturnType<typeof getVideosForModuleController>;

export const getVideosForModuleController = (
    getVideosForModuleUseCase: IGetVideosForModuleUseCase
) => async (moduleId: string | undefined | null) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return getVideosForModuleUseCase(moduleId);
}