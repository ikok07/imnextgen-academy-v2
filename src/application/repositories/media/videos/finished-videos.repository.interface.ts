import {FinishedVideo, finishedVideoSchema} from "@/drizzle/schema/finished_videos";
import {z} from "zod";
import {fullFinishedVideoSchema} from "@/src/entities/models/media/videos/full-finished-video";

export const finishedVideosResponseSchema = z.object({
    finishedVideos: z.array(fullFinishedVideoSchema),
    percentage: z.number()
});

export type FinishedVideosResponse = z.infer<typeof finishedVideosResponseSchema>;

export interface IFinishedVideosRepository {
    getFinishedVideosForModule(moduleId: string, userId: string): Promise<FinishedVideosResponse>;
    getFinishedVideosForSection(moduleId: string, sectionId: string, userId: string): Promise<FinishedVideosResponse>;
    checkFinishedVideo(videoId: string, userId: string): Promise<boolean>;
    addFinishedVideo(videoId: string, userId: string): Promise<FinishedVideo>;
    removeFinishedVideo(videoId: string, userId: string): Promise<void>
}