import {
    ITaskSubmissionsRepository
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";

export type IGetSubmissionsForVideoUseCase = ReturnType<typeof getSubmissionsForVideoUseCase>;

export const getSubmissionsForVideoUseCase = (
    taskSubmissionsRepository: ITaskSubmissionsRepository
) => async (videoId: string, userId: string) => {
    return taskSubmissionsRepository.getSubmissionsForVideo(videoId, userId);
}
