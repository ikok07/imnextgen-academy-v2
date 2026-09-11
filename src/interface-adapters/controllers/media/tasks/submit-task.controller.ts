import {ISubmitTaskUseCase} from "@/src/application/use-cases/media/tasks/submit-task.use-case";
import {SubmitTaskOptions} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";
import {InputParseError} from "@/src/entities/errors/common";

export type ISubmitTaskController = ReturnType<typeof submitTaskController>;

const MAX_CONTENT_LENGTH = 50_000;

export const submitTaskController = (
    submitTaskUseCase: ISubmitTaskUseCase
) => async (opts: Partial<SubmitTaskOptions>) => {
    if (!opts.videoId) throw new InputParseError("Invalid videoId!");
    if (!opts.userId) throw new InputParseError("Invalid userId!");
    if (!opts.taskId) throw new InputParseError("Invalid taskId!");
    if (!opts.content || !opts.content.trim()) throw new InputParseError("Решението не може да е празно!");
    if (opts.content.length > MAX_CONTENT_LENGTH) throw new InputParseError("Решението е твърде дълго!");

    return submitTaskUseCase({
        videoId: opts.videoId,
        userId: opts.userId,
        taskId: opts.taskId,
        taskTitle: opts.taskTitle ?? "",
        content: opts.content,
        link: opts.link?.trim() || undefined
    });
}
