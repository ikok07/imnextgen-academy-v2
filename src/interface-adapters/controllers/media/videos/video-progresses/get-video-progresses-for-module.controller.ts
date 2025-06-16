import {
    IGetVideoProgressesForModuleUseCase
} from "@/src/application/use-cases/media/videos/video-progresses/get-video-progresses-for-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetVideoProgressesForModuleController = ReturnType<typeof getVideoProgressesForModuleController>;

export const getVideoProgressesForModuleController = (
    getVideoProgressesForModuleUseCase: IGetVideoProgressesForModuleUseCase
) => async (userId: string | undefined, moduleId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!moduleId) throw new InputParseError("Invalid moduleId!");

    return getVideoProgressesForModuleUseCase(userId, moduleId);
}