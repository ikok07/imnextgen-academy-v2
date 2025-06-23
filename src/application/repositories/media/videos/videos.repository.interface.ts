import {Video, VideoInsert, videosSchema} from "@/drizzle/schema/videos";
import {sectionsSchema} from "@/drizzle/schema/sections";
import {z} from "zod";
import {videoDescriptionsSchema} from "@/drizzle/schema/video_descriptions";
import {videoChapterSchema} from "@/drizzle/schema/video_chapters";
import {videoResourceSchema} from "@/drizzle/schema/video_resources";

export const videosForModuleResults = z.array(z.object({
    section: sectionsSchema,
    video: videosSchema,
    description: videoDescriptionsSchema.nullable(),
    chapter: videoChapterSchema.nullable(),
    resource: videoResourceSchema.nullable()
}));

export type VideosForModuleResults = z.infer<typeof videosForModuleResults>;

export interface IVideosRepository {
    getVideoById(id: string): Promise<Video>;
    getVideosForModule(moduleId: string): Promise<VideosForModuleResults>;
    getVideosForSection(sectionId: string): Promise<Video[]>;
    createVideo(data: VideoInsert): Promise<Video>;
    updateVideo(moduleId: string, videoId: string, data: Partial<VideoInsert>): Promise<Video>;
    deleteVideo(moduleId: string, videoId: string): Promise<void>;
    deleteMultipleVideos(moduleId: string, videoIds: string[]): Promise<void>;
}