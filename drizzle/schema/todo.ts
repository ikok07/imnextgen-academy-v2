// import {pgPolicy, pgTable, text} from "drizzle-orm/pg-core";
// import {authenticatedRole, authUid, crudPolicy} from "drizzle-orm/neon";
// import {createInsertSchema, createSelectSchema} from "drizzle-zod";
// import {z} from "zod";
// import {randomUUID} from "node:crypto";
// import { sql } from "drizzle-orm";
//
// export const todoTable = pgTable("todoes", {
//     id: text("id").$default(randomUUID).primaryKey(),
//     userId: text("user_id").notNull(),
//     content: text("content").notNull()
// }, (table) => [
//     pgPolicy("allow_authenticated_users_to_select", {
//         as: "permissive",
//         to: authenticatedRole,
//         for: "select",
//         using: sql`auth.user_id() = user_id`
//     }),
//     pgPolicy("allow_authenticated_users_to_insert", {
//         as: "permissive",
//         to: authenticatedRole,
//         for: "insert",
//         withCheck: sql`true`
//     })
// ])
//
//
// export const todoSchema = createSelectSchema(todoTable);
// export type Todo = z.infer<typeof todoSchema>;
//
// export const todoInsertSchema = createInsertSchema(todoTable);
// export type TodoInsert = z.infer<typeof todoInsertSchema>;