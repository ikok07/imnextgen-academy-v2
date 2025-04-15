import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IVideosRepository} from "@/src/application/repositories/media/videos/videos.repository.interface";
import {Video, videosTable} from "@/drizzle/schema/videos";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {sectionsTable} from "@/drizzle/schema/sections";
import {eq} from "drizzle-orm";
import {modulesTable} from "@/drizzle/schema/modules";

export class VideosRepository extends BaseRepository implements IVideosRepository {
    getVideosForModule(moduleId: string): Promise<Video[]> {
        try {
            return this.queryDB(async db => {
                const res = await db.select({
                    videos: videosTable
                })
                    .from(videosTable)
                    .innerJoin(sectionsTable, eq(sectionsTable.id, videosTable.section_id))
                    .innerJoin(modulesTable, eq(modulesTable.id, sectionsTable.module_id))
                    .where(eq(modulesTable.id, moduleId))
                    .execute();

                return res.map(r => r.videos);
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get videos for module! ${e}`)
        }

    }

}