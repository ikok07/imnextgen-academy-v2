import {pgEnum, pgTable, text, integer, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {profilesTable} from "@/drizzle/schema/profiles";
import {videosTable} from "@/drizzle/schema/videos";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const taskSubmissionStatus = pgEnum("task_submission_status", ["pending", "approved", "changes_requested"]);

export const taskSubmissionStatusSchema = z.enum(taskSubmissionStatus.enumValues);
export type TaskSubmissionStatus = z.infer<typeof taskSubmissionStatusSchema>;

/**
 * ВНИМАНИЕ: външните ключове по-долу описват намерението, но НЕ са приложени в базата.
 * Потребителят от DATABASE_URL няма право REFERENCES върху таблиците на neondb_owner.
 * Виж docs/sql/task-submissions-foreign-keys.sql - изпълнява се еднократно от собственика.
 */
export const taskSubmissionsTable = pgTable("task_submissions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    video_id: text("video_id").notNull().references(() => videosTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    /** Идентификатор на задачата вътре в урока (един урок може да има повече от една). */
    task_id: text("task_id").notNull(),
    task_title: text("task_title").notNull().default(""),
    /** Кодът/отговорът на курсиста. */
    content: text("content").notNull(),
    /** Незадължителен линк към GitHub, Vercel или друго. */
    link: text("link"),
    status: taskSubmissionStatus("status").notNull().default("pending"),
    mentor_feedback: text("mentor_feedback"),
    reviewed_by: text("reviewed_by").references(() => profilesTable.id, {
        onDelete: "set null",
        onUpdate: "cascade"
    }),
    created_at: integer("created_at").notNull().default(sql`extract(epoch from now())`),
    updated_at: integer("updated_at").notNull().default(sql`extract(epoch from now())`),
    reviewed_at: integer("reviewed_at")
}, (table) => ({
    uniqueSubmission: unique().on(table.profile_id, table.video_id, table.task_id)
}));

export const taskSubmissionSchema = createSelectSchema(taskSubmissionsTable);
export type TaskSubmission = z.infer<typeof taskSubmissionSchema>;

export const taskSubmissionInsertSchema = createInsertSchema(taskSubmissionsTable);
export type TaskSubmissionInsert = z.infer<typeof taskSubmissionInsertSchema>;
