import { sql } from "drizzle-orm";
import {pgTable, text, boolean} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";

export const setupQuestionsTable = pgTable("setup_questions", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    question: text("question").notNull(),
    is_multiline: boolean("is_multiline").notNull().default(false),
    placeholder: text("placeholder"),
    required: boolean("required").notNull().default(true)
})

export const setupQuestionSchema = createSelectSchema(setupQuestionsTable);
export type SetupQuestion = z.infer<typeof setupQuestionSchema>;

export const setupQuestionInsertSchema = createInsertSchema(setupQuestionsTable);
export type SetupQuestionInsert = z.infer<typeof setupQuestionInsertSchema>;