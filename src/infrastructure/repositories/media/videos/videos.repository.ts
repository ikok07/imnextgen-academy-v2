import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IVideosRepository,
    VideosForModuleResults
} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Video, videosTable} from "@/drizzle/schema/videos";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {sectionsTable} from "@/drizzle/schema/sections";
import {eq} from "drizzle-orm";
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
}