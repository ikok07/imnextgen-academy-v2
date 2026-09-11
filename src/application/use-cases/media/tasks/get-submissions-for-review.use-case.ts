import {
    GetSubmissionsForReviewOptions,
    ITaskSubmissionsRepository
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";

export type IGetSubmissionsForReviewUseCase = ReturnType<typeof getSubmissionsForReviewUseCase>;

export const getSubmissionsForReviewUseCase = (
    taskSubmissionsRepository: ITaskSubmissionsRepository
) => async (opts: GetSubmissionsForReviewOptions) => {
    return taskSubmissionsRepository.getSubmissionsForReview(opts);
}
