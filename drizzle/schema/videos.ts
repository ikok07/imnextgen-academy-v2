import {pgTable, text, integer, check} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {sectionsTable} from "@/drizzle/schema/sections";
import {videoDescriptionsTable} from "@/drizzle/schema/video_descriptions";

export const videosTable = pgTable("videos", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    section_id: text("section_id").references(() => sectionsTable.id, {
        onUpdate: "cascade",
        onDelete: "set null"
    }),
    title: text("title").notNull(),
    url: text("url"),
    description_id: text("description_id").notNull().references(() => videoDescriptionsTable.id),
    order_number: integer("order_number").notNull()
}, (table) => [
    check("order_number_check", sql`${table.order_number} > -1`)
])

export const videosSchema = createSelectSchema(videosTable);
export type Video = z.infer<typeof videosSchema>;

export const videosInsertSchema = createInsertSchema(videosTable);
export type VideoInsert = z.infer<typeof videosInsertSchema>;
