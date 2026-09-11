import {
    ITaskSubmissionsRepository
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";
import {ISubmitTaskUseCase} from "@/src/application/use-cases/media/tasks/submit-task.use-case";
import {ISubmitTaskController} from "@/src/interface-adapters/controllers/media/tasks/submit-task.controller";
import {
    IGetSubmissionsForVideoUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-video.use-case";
import {
    IGetSubmissionsForVideoController
} from "@/src/interface-adapters/controllers/media/tasks/get-submissions-for-video.controller";
import {
    IGetSubmissionsForReviewUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-review.use-case";
import {
    IGetSubmissionsForReviewController
} from "@/src/interface-adapters/controllers/media/tasks/get-submissions-for-review.controller";
import {IReviewSubmissionUseCase} from "@/src/application/use-cases/media/tasks/review-submission.use-case";
import {
    IReviewSubmissionController
} from "@/src/interface-adapters/controllers/media/tasks/review-submission.controller";

export const TASK_SUBMISSIONS_SYMBOLS = {
    ITaskSubmissionsRepository: Symbol.for("ITaskSubmissionsRepository"),

    ISubmitTaskUseCase: Symbol.for("ISubmitTaskUseCase"),
    ISubmitTaskController: Symbol.for("ISubmitTaskController"),

    IGetSubmissionsForVideoUseCase: Symbol.for("IGetSubmissionsForVideoUseCase"),
    IGetSubmissionsForVideoController: Symbol.for("IGetSubmissionsForVideoController"),

    IGetSubmissionsForReviewUseCase: Symbol.for("IGetSubmissionsForReviewUseCase"),
    IGetSubmissionsForReviewController: Symbol.for("IGetSubmissionsForReviewController"),

    IReviewSubmissionUseCase: Symbol.for("IReviewSubmissionUseCase"),
    IReviewSubmissionController: Symbol.for("IReviewSubmissionController")
}

export interface TASK_SUBMISSIONS_RETURN_TYPES {
    ITaskSubmissionsRepository: ITaskSubmissionsRepository,

    ISubmitTaskUseCase: ISubmitTaskUseCase,
    ISubmitTaskController: ISubmitTaskController,

    IGetSubmissionsForVideoUseCase: IGetSubmissionsForVideoUseCase,
    IGetSubmissionsForVideoController: IGetSubmissionsForVideoController,

    IGetSubmissionsForReviewUseCase: IGetSubmissionsForReviewUseCase,
    IGetSubmissionsForReviewController: IGetSubmissionsForReviewController,

    IReviewSubmissionUseCase: IReviewSubmissionUseCase,
    IReviewSubmissionController: IReviewSubmissionController
}
