import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetSubmissionsForReviewOptions,
    ITaskSubmissionsRepository,
    ReviewSubmissionOptions,
    SubmitTaskOptions
} from "@/src/application/repositories/media/tasks/task-submissions.repository.interface";
import {TaskSubmission, taskSubmissionsTable} from "@/drizzle/schema/task_submissions";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {and, count, desc, eq} from "drizzle-orm";
import {profilesTable} from "@/drizzle/schema/profiles";
import {videosTable} from "@/drizzle/schema/videos";
import {sectionsTable} from "@/drizzle/schema/sections";
import {modulesTable} from "@/drizzle/schema/modules";
import {FullTaskSubmission} from "@/src/entities/models/media/tasks/full-task-submission";

export class TaskSubmissionsRepository extends BaseRepository implements ITaskSubmissionsRepository {
    getSubmissionsForVideo(videoId: string, userId: string): Promise<TaskSubmission[]> {
        try {
            return this.queryDB(db => db.select()
                .from(taskSubmissionsTable)
                .where(and(
                    eq(taskSubmissionsTable.video_id, videoId),
                    eq(taskSubmissionsTable.profile_id, userId)
                ))
            );
        } catch (e) {
            throw new DatabaseError(`Failed to get task submissions for video! ${e}`);
        }
    }

    getSubmissionsForUser(userId: string): Promise<TaskSubmission[]> {
        try {
            return this.queryDB(db => db.select()
                .from(taskSubmissionsTable)
                .where(eq(taskSubmissionsTable.profile_id, userId))
                .orderBy(desc(taskSubmissionsTable.updated_at))
            );
        } catch (e) {
            throw new DatabaseError(`Failed to get task submissions for user! ${e}`);
        }
    }

    submitTask(opts: SubmitTaskOptions): Promise<TaskSubmission> {
        try {
            return this.queryDB(async db => {
                const now = Math.floor(Date.now() / 1000);
                const rows = await db.insert(taskSubmissionsTable)
                    .values({
                        video_id: opts.videoId,
                        profile_id: opts.userId,
                        task_id: opts.taskId,
                        task_title: opts.taskTitle,
                        content: opts.content,
                        link: opts.link,
                        status: "pending",
                        created_at: now,
                        updated_at: now
                    })
                    .onConflictDoUpdate({
                        target: [taskSubmissionsTable.profile_id, taskSubmissionsTable.video_id, taskSubmissionsTable.task_id],
                        set: {
                            content: opts.content,
                            link: opts.link,
                            task_title: opts.taskTitle,
                            status: "pending",
                            mentor_feedback: null,
                            reviewed_by: null,
                            reviewed_at: null,
                            updated_at: now
                        }
                    })
                    .returning();

                if (rows.length === 0) throw new Error("Submission not saved!");
                return rows[0];
            });
        } catch (e) {
            throw new DatabaseError(`Failed to submit task! ${e}`);
        }
    }

    getSubmissionsForReview(opts: GetSubmissionsForReviewOptions): Promise<FullTaskSubmission[]> {
        try {
            return this.queryDB(async db => {
                const filters = [
                    opts.status ? eq(taskSubmissionsTable.status, opts.status) : undefined,
                    opts.moduleId ? eq(modulesTable.id, opts.moduleId) : undefined
                ].filter(Boolean);

                const rows = await db.select({
                    submission: taskSubmissionsTable,
                    profileName: profilesTable.name,
                    profileEmail: profilesTable.email,
                    videoTitle: videosTable.title,
                    sectionTitle: sectionsTable.title,
                    moduleTitle: modulesTable.title,
                    moduleId: modulesTable.id
                })
                    .from(taskSubmissionsTable)
                    .innerJoin(profilesTable, eq(profilesTable.id, taskSubmissionsTable.profile_id))
                    .innerJoin(videosTable, eq(videosTable.id, taskSubmissionsTable.video_id))
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(filters.length > 0 ? and(...filters) : undefined)
                    .orderBy(desc(taskSubmissionsTable.updated_at))
                    .limit(opts.limit ?? 200);

                return rows.map(row => ({
                    ...row.submission,
                    profile_name: row.profileName,
                    profile_email: row.profileEmail,
                    video_title: row.videoTitle,
                    section_title: row.sectionTitle,
                    module_title: row.moduleTitle,
                    module_id: row.moduleId
                }));
            });
        } catch (e) {
            throw new DatabaseError(`Failed to get task submissions for review! ${e}`);
        }
    }

    reviewSubmission(opts: ReviewSubmissionOptions): Promise<TaskSubmission> {
        try {
            return this.queryDB(async db => {
                const now = Math.floor(Date.now() / 1000);
                const rows = await db.update(taskSubmissionsTable)
                    .set({
                        status: opts.status,
                        mentor_feedback: opts.feedback ?? null,
                        reviewed_by: opts.reviewerId,
                        reviewed_at: now,
                        updated_at: now
                    })
                    .where(eq(taskSubmissionsTable.id, opts.submissionId))
                    .returning();

                if (rows.length === 0) throw new Error("Submission not found!");
                return rows[0];
            });
        } catch (e) {
            throw new DatabaseError(`Failed to review task submission! ${e}`);
        }
    }

    getPendingSubmissionsCount(): Promise<number> {
        try {
            return this.queryDB(async db => {
                const [row] = await db.select({count: count()})
                    .from(taskSubmissionsTable)
                    .where(eq(taskSubmissionsTable.status, "pending"));
                return row?.count ?? 0;
            });
        } catch (e) {
            throw new DatabaseError(`Failed to count pending task submissions! ${e}`);
        }
    }
}
