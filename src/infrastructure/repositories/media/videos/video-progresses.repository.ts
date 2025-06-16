import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetVideoProgressesResponse,
    IVideoProgressesRepository
} from "@/src/application/repositories/media/videos/video-progresses.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {VideoProgresses, VideoProgressesInsert, videoProgressesTable} from "@/drizzle/schema/video_progresses";
import {and, eq, sql} from "drizzle-orm";
import {sectionsTable} from "@/drizzle/schema/sections";
import {videosTable} from "@/drizzle/schema/videos";
import {modulesTable} from "@/drizzle/schema/modules";

export class VideoProgressesRepository extends BaseRepository implements IVideoProgressesRepository {
    getVideoProgressesForModule(userId: string, moduleId: string): Promise<GetVideoProgressesResponse> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        videoProgress: videoProgressesTable,
                        video: videosTable
                    })
                    .from(videoProgressesTable)
                    .innerJoin(videosTable, eq(videosTable.id, videoProgressesTable.video_id))
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(and(eq(videoProgressesTable.profile_id, userId), eq(modulesTable.id, moduleId)))

            })
        } catch (e) {
            throw new DatabaseError(`Failed to get progress videos for module id! ${e}`);
        }
    }

    getVideoProgressesForSection(userId: string, sectionId: string): Promise<GetVideoProgressesResponse> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        videoProgress: videoProgressesTable,
                        video: videosTable
                    })
                    .from(videoProgressesTable)
                    .innerJoin(videosTable, eq(videosTable.id, videoProgressesTable.video_id))
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .where(and(eq(videoProgressesTable.profile_id, userId), eq(sectionsTable.id, sectionId)));
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get progress videos for section id! ${e}`);
        }
    }

    setVideoProgress(data: VideoProgressesInsert): Promise<VideoProgresses | undefined> {
        try {
            return this.queryDB(async db => {
                return (await db.insert(videoProgressesTable).values(data).onConflictDoUpdate({
                    target: [videoProgressesTable.profile_id, videoProgressesTable.video_id],
                    set: {
                        progress_percentage: data.progress_percentage
                    },
                    setWhere: sql`${videoProgressesTable.progress_percentage} < ${data.progress_percentage}`
                }).returning())[0]
            });
        } catch (e) {
            throw new DatabaseError(`Failed to set video progress! ${e}`);
        }
    }
}