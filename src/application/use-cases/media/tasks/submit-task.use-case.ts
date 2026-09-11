import {
    ITaskSubmissionsRepository,
    SubmitTaskOptions
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";

export type ISubmitTaskUseCase = ReturnType<typeof submitTaskUseCase>;

export const submitTaskUseCase = (
    taskSubmissionsRepository: ITaskSubmissionsRepository
) => async (opts: SubmitTaskOptions) => {
    return taskSubmissionsRepository.submitTask(opts);
}
