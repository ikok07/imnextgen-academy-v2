import {z} from "zod";
import {VideoProgresses, VideoProgressesInsert, videoProgressesSchema} from "@/drizzle/schema/video_progresses";
import {videosSchema} from "@/drizzle/schema/videos";

export const getVideoProgressesResponseSchema = z.object({
    videoProgress: videoProgressesSchema,
    video: videosSchema
});

export type GetVideoProgressesResponse = z.infer<typeof getVideoProgressesResponseSchema>;

export interface IVideoProgressesRepository {
    getVideoProgressByVideoId(userId: string, videoId: string): Promise<GetVideoProgressesResponse | undefined>
    getVideoProgressesForModule(userId: string, moduleId: string): Promise<GetVideoProgressesResponse[]>,
    getVideoProgressesForSection(userId: string, sectionId: string): Promise<GetVideoProgressesResponse[]>,
    setVideoProgress(data: VideoProgressesInsert): Promise<VideoProgresses | undefined>
}