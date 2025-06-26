import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IVideoDescriptionsRepository
} from "@/src/application/repositories/media/videos/video-descriptions.repository.interface";
import {VideoDescription, VideoDescriptionInsert, videoDescriptionsTable} from "@/drizzle/schema/video_descriptions";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class VideoDescriptionsRepository extends BaseRepository implements IVideoDescriptionsRepository {
    getVideoDescriptions(): Promise<VideoDescription[]> {
        try {
            return this.queryDB(db => {
                return db.select().from(videoDescriptionsTable);
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get video descriptions! ${e}`);
        }
    }
    getVideoDescriptionById(id: string): Promise<VideoDescription> {
        try {
            return this.queryDB(async db => {
                const res = await db.query.videoDescriptionsTable.findFirst({where: eq(videoDescriptionsTable.id, id)});
                if (!res) throw new Error("Video description not found!");
                return res;
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get video description by id! ${e}`);
        }
    }
    createVideoDescription(data: VideoDescriptionInsert): Promise<VideoDescription> {
        try {
            return this.queryDB(async db => {
                const res = await db.insert(videoDescriptionsTable).values(data).returning();
                if (res.length === 0) throw new Error("Video description could not be created!");
                return res[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to create video description! ${e}`);
        }
    }
    updateVideoDescription(descriptionId: string, data: Partial<VideoDescriptionInsert>): Promise<VideoDescription> {
        try {
            return this.queryDB(async db => {
                const res = await db.update(videoDescriptionsTable).set(data).where(eq(videoDescriptionsTable.id, descriptionId)).returning();
                if (res.length === 0) throw new Error("Video description could not be update!");
                return res[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to update video description! ${e}`);
        }
    }
    async deleteVideoDescription(id: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(videoDescriptionsTable).where(eq(videoDescriptionsTable.id, id));
            })
        } catch (e) {
            throw new DatabaseError(`Failed to delete video description! ${e}`);
        }
    }

}