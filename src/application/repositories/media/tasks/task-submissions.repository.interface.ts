import {TaskSubmission, TaskSubmissionStatus} from "@/drizzle/schema/task_submissions";
import {FullTaskSubmission} from "@/src/entities/models/media/tasks/full-task-submission";

export type SubmitTaskOptions = {
    videoId: string,
    userId: string,
    taskId: string,
    taskTitle: string,
    content: string,
    link?: string
}

export type ReviewSubmissionOptions = {
    submissionId: string,
    reviewerId: string,
    status: Extract<TaskSubmissionStatus, "approved" | "changes_requested">,
    feedback?: string
}

export type GetSubmissionsForReviewOptions = {
    status?: TaskSubmissionStatus,
    moduleId?: string,
    limit?: number
}

export interface ITaskSubmissionsRepository {
    getSubmissionsForVideo(videoId: string, userId: string): Promise<TaskSubmission[]>
    getSubmissionsForUser(userId: string): Promise<TaskSubmission[]>
    submitTask(opts: SubmitTaskOptions): Promise<TaskSubmission>
    getSubmissionsForReview(opts: GetSubmissionsForReviewOptions): Promise<FullTaskSubmission[]>
    reviewSubmission(opts: ReviewSubmissionOptions): Promise<TaskSubmission>
    getPendingSubmissionsCount(): Promise<number>
}
