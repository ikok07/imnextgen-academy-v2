import {finishedVideoSchema} from "@/drizzle/schema/finished_videos";
import {videosSchema} from "@/drizzle/schema/videos";
import {z} from "zod";

export const fullFinishedVideoSchema = finishedVideoSchema.and(videosSchema.omit({id: true}));

export type FullFinishedVideo = z.infer<typeof fullFinishedVideoSchema>;