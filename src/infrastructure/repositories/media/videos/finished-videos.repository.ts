import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    FinishedVideosResponse,
    IFinishedVideosRepository
} from "@/src/application/repositories/media/videos/finished-videos.repository.interface";
import {FinishedVideo, finishedVideosTable} from "@/drizzle/schema/finished_videos";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, count, eq} from "drizzle-orm";
import {videosTable} from "@/drizzle/schema/videos";
import {sectionsTable} from "@/drizzle/schema/sections";
import {modulesTable} from "@/drizzle/schema/modules";

export class FinishedVideosRepository extends BaseRepository implements IFinishedVideosRepository {
    getFinishedVideosForModule(moduleId: string, userId: string): Promise<FinishedVideosResponse> {
        try {
            return this.queryDB(async db => {
                const finishedVideos = (await db.select({
                    finishedVideo: finishedVideosTable
                })
                    .from(finishedVideosTable)
                    .innerJoin(videosTable, eq(finishedVideosTable.video_id, videosTable.id))
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(and(
                        eq(finishedVideosTable.profile_id, userId),
                        eq(modulesTable.id, moduleId)
                    ))
                    .execute()).map(r => r.finishedVideo);

                const [{count: videosCount}] = await db.select({count: count()})
                    .from(videosTable)
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(eq(modulesTable.id, moduleId))
                    .execute();

                return {finishedVideos, percentage: Math.round((finishedVideos.length / videosCount) * 100)}
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get finished videos! ${e}`)
        }
    }

    // Currently not used
    checkFinishedVideo(videoId: string, userId: string): Promise<boolean> {
        try {
            return this.queryDB(async db => {
                const [{count: videosCount}] = await db.select({count: count()}).from(finishedVideosTable).where(and(eq(finishedVideosTable.video_id, videoId), eq(finishedVideosTable.profile_id, userId)));
                return videosCount > 0;
            })
        } catch(e) {
            throw new DatabaseError(`Failed to check finished video! ${e}`)
        }
    }
    addFinishedVideo(videoId: string, userId: string): Promise<FinishedVideo> {
        try {
            return this.queryDB(async db => {
                return (await db.insert(finishedVideosTable).values({
                    video_id: videoId,
                    profile_id: userId
                }).returning())[0]
            })
        } catch(e) {
            throw new DatabaseError(`Failed to add finished video! ${e}`)
        }
    }
    async removeFinishedVideo(videoId: string, userId: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(finishedVideosTable).where(and(eq(finishedVideosTable.video_id, videoId), eq(finishedVideosTable.profile_id, userId)))
            })
        } catch(e) {
            throw new DatabaseError(`Failed to remove finished video! ${e}`)
        }
    }
}