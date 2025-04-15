import {pgTable, text} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const videoDescriptionsTable = pgTable("video_descriptions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    label: text("label").notNull(),
    markdown: text("markdown")
})

export const videoDescriptionsSchema = createSelectSchema(videoDescriptionsTable);
export type VideoDescription = z.infer<typeof videoDescriptionsSchema>;

export const videoDescriptionsInsertSchema = createInsertSchema(videoDescriptionsTable);
export type VideoDescriptionInsert = z.infer<typeof videoDescriptionsInsertSchema>;