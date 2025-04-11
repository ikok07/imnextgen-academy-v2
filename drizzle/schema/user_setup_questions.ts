import { sql } from "drizzle-orm";
import {pgTable, text} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import { setupQuestionsTable } from "./setup_questions";
import {profilesTable} from "@/drizzle/schema/profiles";

export const userSetupQuestionsTable = pgTable("user_setup_questions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    question_id: text("question_id").notNull().references(() => setupQuestionsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    profile_id: text("profile_id").notNull().references(() => profilesTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    answer: text("answer"),
})

export const userSetupQuestionSchema = createSelectSchema(userSetupQuestionsTable);
export type UserSetupQuestion = z.infer<typeof userSetupQuestionSchema>;

export const userSetupQuestionInsertSchema = createInsertSchema(userSetupQuestionsTable);
export type UserSetupQuestionInsert = z.infer<typeof userSetupQuestionInsertSchema>;