import {integer, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {videosTable} from "@/drizzle/schema/videos";

export const videoChaptersTable = pgTable("video_chapters", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    video_id: text("video_id").notNull().references(() => videosTable.id),
    name: text("name").notNull(),
    start_seconds: integer("start_seconds").notNull(),
    end_seconds: integer("end_seconds")
});

export const videoChapterSchema = createSelectSchema(videoChaptersTable);
export type VideoChapter = z.infer<typeof videoChapterSchema>;

export const videoChapterInsertSchema = createInsertSchema(videoChaptersTable);
export type VideoChapterInsert = z.infer<typeof videoChapterInsertSchema>;