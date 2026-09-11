import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    TaskSubmissionsRepository
} from "@/src/infrastructure/repositories/media/tasks/task-submissions.repository";
import {submitTaskUseCase} from "@/src/application/use-cases/media/tasks/submit-task.use-case";
import {submitTaskController} from "@/src/interface-adapters/controllers/media/tasks/submit-task.controller";
import {
    getSubmissionsForVideoUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-video.use-case";
import {
    getSubmissionsForVideoController
} from "@/src/interface-adapters/controllers/media/tasks/get-submissions-for-video.controller";
import {
    getSubmissionsForReviewUseCase
} from "@/src/application/use-cases/media/tasks/get-submissions-for-review.use-case";
import {
    getSubmissionsForReviewController
} from "@/src/interface-adapters/controllers/media/tasks/get-submissions-for-review.controller";
import {reviewSubmissionUseCase} from "@/src/application/use-cases/media/tasks/review-submission.use-case";
import {
    reviewSubmissionController
} from "@/src/interface-adapters/controllers/media/tasks/review-submission.controller";

export function createTaskSubmissionsModule() {
    const taskSubmissionsModule = createModule();

    taskSubmissionsModule
        .bind(DI_SYMBOLS.ITaskSubmissionsRepository)
        .toClass(TaskSubmissionsRepository);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.ISubmitTaskUseCase)
        .toHigherOrderFunction(submitTaskUseCase, [DI_SYMBOLS.ITaskSubmissionsRepository]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.ISubmitTaskController)
        .toHigherOrderFunction(submitTaskController, [DI_SYMBOLS.ISubmitTaskUseCase]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IGetSubmissionsForVideoUseCase)
        .toHigherOrderFunction(getSubmissionsForVideoUseCase, [DI_SYMBOLS.ITaskSubmissionsRepository]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IGetSubmissionsForVideoController)
        .toHigherOrderFunction(getSubmissionsForVideoController, [DI_SYMBOLS.IGetSubmissionsForVideoUseCase]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IGetSubmissionsForReviewUseCase)
        .toHigherOrderFunction(getSubmissionsForReviewUseCase, [DI_SYMBOLS.ITaskSubmissionsRepository]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IGetSubmissionsForReviewController)
        .toHigherOrderFunction(getSubmissionsForReviewController, [DI_SYMBOLS.IGetSubmissionsForReviewUseCase]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IReviewSubmissionUseCase)
        .toHigherOrderFunction(reviewSubmissionUseCase, [DI_SYMBOLS.ITaskSubmissionsRepository]);

    taskSubmissionsModule
        .bind(DI_SYMBOLS.IReviewSubmissionController)
        .toHigherOrderFunction(reviewSubmissionController, [DI_SYMBOLS.IReviewSubmissionUseCase]);

    return taskSubmissionsModule;
}
