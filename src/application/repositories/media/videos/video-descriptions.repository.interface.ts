import {VideoDescription, VideoDescriptionInsert} from "@/drizzle/schema/video_descriptions";

export interface IVideoDescriptionsRepository {
    getVideoDescriptions(): Promise<VideoDescription[]>;
    getVideoDescriptionById(id: string): Promise<VideoDescription>;
    createVideoDescription(data: VideoDescriptionInsert): Promise<VideoDescription>;
    updateVideoDescription(videoId: string, data: Partial<VideoDescriptionInsert>): Promise<VideoDescription>;
    deleteVideoDescription(id: string): Promise<void>
}