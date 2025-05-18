import {Video, videosSchema} from "@/drizzle/schema/videos";
import {sectionsSchema} from "@/drizzle/schema/sections";
import {z} from "zod";
import {videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";
import {videoChapterSchema} from "@/drizzle/schema/video_chapters";

export const videosForModuleResults = z.array(z.object({
    section: sectionsSchema,
    video: videosSchema,
    description: videoDescriptionsSchema.nullable(),
    chapter: videoChapterSchema.nullable()
}));

export type VideosForModuleResults = z.infer<typeof videosForModuleResults>;

export interface IVideosRepository {
    getVideoById(id: string): Promise<Video>;
    getVideosForModule(moduleId: string): Promise<VideosForModuleResults>;
    getVideosForSection(sectionId: string): Promise<Video[]>;
}