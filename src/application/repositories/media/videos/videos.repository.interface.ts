import {Video} from "@/drizzle/schema/videos";

export interface IVideosRepository {
    getVideoById(id: string): Promise<Video>;
    getVideosForModule(moduleId: string): Promise<Video[]>;
    getVideosForSection(sectionId: string): Promise<Video[]>;
}