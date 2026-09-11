import {
    ITaskSubmissionsRepository,
    ReviewSubmissionOptions
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";

export type IReviewSubmissionUseCase = ReturnType<typeof reviewSubmissionUseCase>;

export const reviewSubmissionUseCase = (
    taskSubmissionsRepository: ITaskSubmissionsRepository
) => async (opts: ReviewSubmissionOptions) => {
    return taskSubmissionsRepository.reviewSubmission(opts);
}
