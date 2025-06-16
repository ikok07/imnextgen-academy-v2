import {integer, pgTable, text, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {profilesTable} from "@/drizzle/schema/profiles";
import {videosTable} from "@/drizzle/schema/videos";

export const videoProgressesTable = pgTable("video_progresses", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onUpdate: "cascade",
        onDelete: "cascade"
    }),
    video_id: text("video_id").notNull().references(() => videosTable.id, {
        onUpdate: "cascade",
        onDelete: "cascade"
    }),
    progress_percentage: integer("progress_percentage").notNull()
}, (table) => {
    return {
        profile_id_video_id_unique: unique().on(table.profile_id, table.video_id)
    }
});

export const videoProgressesSchema = createSelectSchema(videoProgressesTable);
export type VideoProgresses = z.infer<typeof videoProgressesSchema>;

export const videoProgressesInsertSchema = createInsertSchema(videoProgressesTable);
export type VideoProgressesInsert = z.infer<typeof videoProgressesInsertSchema>;