import {pgTable, text, integer, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {profilesTable} from "@/drizzle/schema/profiles";
import {videosTable} from "@/drizzle/schema/videos";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const finishedVideosTable = pgTable("finished_videos", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    video_id: text("video_id").notNull().references(() => videosTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    created_at: integer("created_at").notNull().default(sql`extract(epoch from now())`)
},(table) => ({
    uniqueProfileVideo: unique().on(table.profile_id, table.video_id)
}));

export const finishedVideoSchema = createSelectSchema(finishedVideosTable);
export type FinishedVideo = z.infer<typeof finishedVideoSchema>;

export const finishedVideoInsertSchema = createInsertSchema(finishedVideosTable);
export type FinishedVideoInsert = z.infer<typeof finishedVideoInsertSchema>;