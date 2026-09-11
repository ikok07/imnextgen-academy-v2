import {
    IGetSubmissionsForVideoUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-video.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSubmissionsForVideoController = ReturnType<typeof getSubmissionsForVideoController>;

export const getSubmissionsForVideoController = (
    getSubmissionsForVideoUseCase: IGetSubmissionsForVideoUseCase
) => async (videoId: string | undefined, userId: string | undefined) => {
    if (!videoId) throw new InputParseError("Invalid videoId!");
    if (!userId) throw new InputParseError("Invalid userId!");

    return getSubmissionsForVideoUseCase(videoId, userId);
}
