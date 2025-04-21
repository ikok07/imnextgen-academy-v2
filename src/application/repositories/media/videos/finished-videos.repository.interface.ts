import {FinishedVideo} from "@/drizzle/schema/finished_videos";
import {z} from "zod";

export const finishedVideosResponseSchema = z.object({
    finishedVideos: z.array(z.custom<FinishedVideo>()),
    percentage: z.number()
})

export type FinishedVideosResponse = z.infer<typeof finishedVideosResponseSchema>;

export interface IFinishedVideosRepository {
    getFinishedVideosForModule(moduleId: string, userId: string): Promise<FinishedVideosResponse>;
    checkFinishedVideo(videoId: string, userId: string): Promise<boolean>;
    addFinishedVideo(videoId: string, userId: string): Promise<FinishedVideo>;
    removeFinishedVideo(videoId: string, userId: string): Promise<void>
}