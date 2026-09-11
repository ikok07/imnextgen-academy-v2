import {IReviewSubmissionUseCase} from "@/src/application/use-cases/media/tasks/review-submission.use-case";
import {
    ReviewSubmissionOptions
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type IReviewSubmissionController = ReturnType<typeof reviewSubmissionController>;

export const reviewSubmissionController = (
    reviewSubmissionUseCase: IReviewSubmissionUseCase
) => async (opts: Partial<ReviewSubmissionOptions>) => {
    if (!opts.submissionId) throw new InputParseError("Invalid submissionId!");
    if (!opts.reviewerId) throw new InputParseError("Invalid reviewerId!");
    if (opts.status !== "approved" && opts.status !== "changes_requested") throw new InputParseError("Invalid status!");
    if (opts.status === "changes_requested" && !opts.feedback?.trim()) {
        throw new InputParseError("При върната задача обратната връзка е задължителна!");
    }

    return reviewSubmissionUseCase({
        submissionId: opts.submissionId,
        reviewerId: opts.reviewerId,
        status: opts.status,
        feedback: opts.feedback
    });
}
