import {FinishedVideo, finishedVideoSchema} from "@/drizzle/schema/finished_videos";
import {z} from "zod";
import {fullFinishedVideoSchema} from "@/src/entities/models/media/videos/full-finished-video";
import {videosSchema} from "@/drizzle/schema/videos";
import {sectionsSchema} from "@/drizzle/schema/sections";

export const finishedVideosResponseSchema = z.object({
    finishedVideos: z.array(fullFinishedVideoSchema),
    percentage: z.number()
});

export const finishedVideosForAllSectionsRawResponseSchema = z.array(z.object({
    finishedVideo: finishedVideoSchema,
    video: videosSchema,
    section: sectionsSchema,
    videosCount: z.number()
}));

export const finishedVideosForAllSectionsResponseSchema = z.object({
    sections: z.array(z.object({
        id: z.string(),
        finishedVideos: z.array(fullFinishedVideoSchema),
        percentage: z.number()
    }))
});

export type FinishedVideosResponse = z.infer<typeof finishedVideosResponseSchema>;
export type FinishedVideosForAllSectionsRawResponse = z.infer<typeof finishedVideosForAllSectionsRawResponseSchema>;
export type FinishedVideosForAllSectionsResponse = z.infer<typeof finishedVideosForAllSectionsResponseSchema>;

export interface IFinishedVideosRepository {
    getFinishedVideosForModule(moduleId: string, userId: string): Promise<FinishedVideosResponse>;
    getFinishedVideosForAllSectionsInModule(moduleId: string, userId: string): Promise<FinishedVideosForAllSectionsRawResponse>
    getFinishedVideosForSection(moduleId: string, sectionId: string, userId: string): Promise<FinishedVideosResponse>;
    checkFinishedVideo(videoId: string, userId: string): Promise<boolean>;
    addFinishedVideo(videoId: string, userId: string): Promise<FinishedVideo>;
    removeFinishedVideo(videoId: string, userId: string): Promise<void>
}