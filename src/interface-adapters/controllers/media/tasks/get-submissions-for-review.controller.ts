import {
    IGetSubmissionsForReviewUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-review.use-case";
import {
    GetSubmissionsForReviewOptions
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";

export type IGetSubmissionsForReviewController = ReturnType<typeof getSubmissionsForReviewController>;

export const getSubmissionsForReviewController = (
    getSubmissionsForReviewUseCase: IGetSubmissionsForReviewUseCase
) => async (opts?: Partial<GetSubmissionsForReviewOptions>) => {
    return getSubmissionsForReviewUseCase({
        status: opts?.status,
        moduleId: opts?.moduleId,
        limit: opts?.limit
    });
}
