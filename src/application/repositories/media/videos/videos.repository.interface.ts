import {Video, videosSchema} from "@/drizzle/schema/videos";
import {Section, sectionsSchema} from "@/drizzle/schema/sections";
import {z} from "zod";
import {videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";

export const videosForModuleResponse = z.array(z.object({
    section: sectionsSchema,
    videos: z.array(videosSchema),
    descriptions: z.array(videoDescriptionsSchema)
}))

export type VideosForModuleResponse = z.infer<typeof videosForModuleResponse>;

export interface IVideosRepository {
    getVideoById(id: string): Promise<Video>;
    getVideosForModule(moduleId: string): Promise<VideosForModuleResponse>;
    getVideosForSection(sectionId: string): Promise<Video[]>;
}