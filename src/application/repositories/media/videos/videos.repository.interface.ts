import {Video} from "@/drizzle/schema/videos";

export interface IVideosRepository {
    getVideosForModule(moduleId: string): Promise<Video[]>;
}