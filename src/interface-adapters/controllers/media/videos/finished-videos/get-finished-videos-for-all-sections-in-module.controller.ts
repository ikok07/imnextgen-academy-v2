import {
    IGetFinishedVideosForAllSectionsInModuleUseCase
} from "@/src/application/use-cases/media/videos/finished-videos/get-finished-videos-for-all-sections-in-module.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetFinishedVideosForAllSectionsInModuleController = ReturnType<typeof getFinishedVideosForAllSectionsInModuleController>;

export const getFinishedVideosForAllSectionsInModuleController = (
    getFinishedVideosForAllSectionsInModuleUseCase: IGetFinishedVideosForAllSectionsInModuleUseCase
) => async (moduleId: string | undefined, userId: string | undefined) => {

    if (!moduleId) throw new InputParseError("Invalid moduleId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return getFinishedVideosForAllSectionsInModuleUseCase(moduleId, userId);
}