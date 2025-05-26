import {pgEnum, pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {videosTable} from "@/drizzle/schema/videos";

export const videoResourceType = pgEnum("video_resource_type", ["image", "file"])

export const videoResourceTable = pgTable("video_resources", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    label: text("label").notNull(),
    type: videoResourceType().notNull().default("file"),
    url: text("url").notNull(),
    video_id: text("video_id").notNull().references(() => videosTable.id)
});

export const videoResourceSchema = createSelectSchema(videoResourceTable);
export type VideoResource = z.infer<typeof videoResourceSchema>;

export const videoResourceInsertSchema = createInsertSchema(videoResourceTable);
export type VideoResourceInsert = z.infer<typeof videoResourceInsertSchema>;