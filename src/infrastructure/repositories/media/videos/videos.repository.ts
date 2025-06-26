import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IVideosRepository,
    VideosForModuleResults
} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Video, VideoInsert, videosTable} from "@/drizzle/schema/videos";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {sectionsTable} from "@/drizzle/schema/sections";
import {and, eq, exists, gt, gte, inArray, sql} from "drizzle-orm";
import {modulesTable} from "@/drizzle/schema/modules";
import {videoDescriptionsTable} from "@/drizzle/schema/video_descriptions";
import {videoChaptersTable} from "@/drizzle/schema/video_chapters";
import {videoResourceTable} from "@/drizzle/schema/video_resources";

export class VideosRepository extends BaseRepository implements IVideosRepository {
    getVideoById(id: string): Promise<Video> {
        try {
            return this.queryDB(async db => {
                const result = await db.query.videosTable.findFirst({where: eq(videosTable.id, id)});
                if (!result) throw new Error("Could not find video with this ID!");

                return result;
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get video! ${e}`)
        }
    }

    getVideosForModule(moduleId: string): Promise<VideosForModuleResults> {
        try {
            return this.queryDB(db => {
                return db.select({
                    video: videosTable,
                    section: sectionsTable,
                    description: videoDescriptionsTable,
                    chapter: videoChaptersTable,
                    resource: videoResourceTable
                })
                    .from(videosTable)
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .leftJoin(videoDescriptionsTable, eq(videoDescriptionsTable.id, videosTable.description_id))
                    .leftJoin(videoChaptersTable, eq(videoChaptersTable.video_id, videosTable.id))
                    .leftJoin(videoResourceTable, eq(videoResourceTable.video_id, videosTable.id))
                    .where(eq(modulesTable.id, moduleId))
                    .execute();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get videos for module! ${e}`)
        }
    }

    getVideosForSection(sectionId: string): Promise<Video[]> {
        try {
            return this.queryDB(async db => {
                const res = await db.select({
                    videos: videosTable
                })
                    .from(videosTable)
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .where(eq(sectionsTable.id, sectionId))
                    .execute();

                return res.map(r => r.videos);
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get videos for section! ${e}`)
        }
    }

    createVideo(moduleId: string, data: VideoInsert): Promise<Video> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {
                    await tx.update(videosTable)
                        .set({
                            order_number: sql`${videosTable.order_number} + 1`
                        })
                        .where(
                            and(
                                exists(
                                    tx.select().from(sectionsTable)
                                        .where(and(
                                            eq(sectionsTable.id, videosTable.section_id),
                                            eq(sectionsTable.module_id, moduleId)
                                        ))
                                ),
                                gte(videosTable.order_number, data.order_number)
                            )
                        );

                    const res = await tx.insert(videosTable).values(data).returning()
                    if (res.length === 0) throw new Error("Video not created!");

                    return res[0];
                })
            })
        } catch(e) {
            throw new DatabaseError(`Failed to create video! ${e}`)
        }
    }

    updateVideo(moduleId: string, videoId: string, data: Partial<VideoInsert>): Promise<Video> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {

                    const videoToUpdate = await tx.select().from(videosTable).where(eq(videosTable.id, videoId)).then(rows => rows[0]);
                    if (!videoToUpdate) throw new Error("Video not found!");

                    const res = await tx.update(videosTable).set(data).where(eq(videosTable.id, videoId)).returning();
                    if (res.length === 0) throw new Error("Video not updated!");

                    if (data.order_number !== undefined && data.order_number !== null) {
                        const newNumberIsHigher = data.order_number > videoToUpdate.order_number;
                        // Sort the updated modules in the right order
                        const updatedVideos = await tx.select()
                            .from(videosTable)
                            .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                            .where(eq(sectionsTable.module_id, moduleId))
                            .then(rows => rows.map(r => r.videos).sort((a, b) => {
                                if (a.order_number === data.order_number && b.order_number === data.order_number) {
                                    if (newNumberIsHigher) {
                                        // Updated module is in front of the other duplicate
                                        return a.id === videoId ? 1 : -1;
                                    } else {
                                        // Updated module is behind the other duplicate
                                        return a.id === videoId ? -1 : 1;
                                    }
                                }

                                return a.order_number - b.order_number;
                            }));

                        for (let i = 0; i < updatedVideos.length; i++) {
                            await tx.update(videosTable).set({order_number: i}).where(eq(videosTable.id, updatedVideos[i].id));
                        }
                    }

                    return res[0];
                })
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update video! ${e}`)
        }
    }

    deleteVideo(moduleId: string, videoId: string): Promise<void> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async (tx) => {
                    const videoToDelete = await tx.select().from(videosTable).where(eq(videosTable.id, videoId)).then(rows => rows[0]);

                    if (!videoToDelete) throw new Error("Video not found!");

                    await tx.delete(videosTable).where(eq(videosTable.id, videoId))
                    await tx.update(videosTable)
                        .set({
                            order_number: sql`${videosTable.order_number} - 1`
                        })
                        .where(
                            and(
                                exists(
                                    tx.select().from(sectionsTable)
                                        .where(and(
                                            eq(sectionsTable.id, videosTable.section_id),
                                            eq(sectionsTable.module_id, moduleId)
                                        ))
                                ),
                                gt(videosTable.order_number, videoToDelete.order_number)
                            )
                        );
                });
            })
        } catch(e) {
            throw new DatabaseError(`Failed to delete video! ${e}`)
        }
    }

    deleteMultipleVideos(moduleId: string, videoIds: string[]): Promise<void> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async (tx) => {
                    await tx.delete(videosTable).where(inArray(videosTable.id, videoIds)).returning();
                    const remainingVideos = await tx.select()
                        .from(videosTable)
                        .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                        .where(eq(sectionsTable.module_id, moduleId))
                        .then(rows => rows.map(r => r.videos).sort((a, b) => a.order_number - b.order_number));

                    const updates: Promise<any>[] = [];
                    for (let i = 0; i < remainingVideos.length; i++) {
                        if (remainingVideos[i].order_number !== i) {
                            updates.push(
                                tx.update(videosTable).set({order_number: i}).where(eq(videosTable.id, remainingVideos[i].id))
                            )
                        }
                    }

                    await Promise.all(updates);
                });
            })
        } catch(e) {
            throw new DatabaseError(`Failed to delete multiple videos! ${e}`)
        }
    }
}