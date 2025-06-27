import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IVideoResourcesRepository
} from "@/src/application/repositories/media/videos/video-resources.repository.interface";
import {VideoResourceInsert, VideoResource, videoResourceTable} from "@/drizzle/schema/video_resources";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class VideoResourcesRepository extends BaseRepository implements IVideoResourcesRepository {
    createResource(data: VideoResourceInsert): Promise<VideoResource> {
        try {
            return this.queryDB(async db => {
                const res = await db.insert(videoResourceTable).values(data).returning();
                if (res.length === 0) throw new Error("Could not insert video resource!")
                return res[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to create video resource! ${e}`);
        }
    }
    async deleteResource(resourceId: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(videoResourceTable).where(eq(videoResourceTable.id, resourceId));
            });
        } catch (e) {
            throw new DatabaseError(`Failed to delete video resource! ${e}`);
        }
    }
}