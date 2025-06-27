import {VideoResource, VideoResourceInsert} from "@/drizzle/schema/video_resources";

export interface IVideoResourcesRepository {
    createResource(data: VideoResourceInsert): Promise<VideoResource>
    deleteResource(resourceId: string): Promise<void>
}