import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {ITodosRepository} from "@/src/application/repositories/todoes.repository.interface";
import {Todo, TodoInsert, todoTable} from "@/drizzle/schema/todo";
import {eq} from "drizzle-orm";
import { DatabaseError } from "@/src/entities/errors/db/database";

export class TodosRepository extends BaseRepository implements ITodosRepository {

    constructor(authenticationService: IAuthenticationService) {
        super(authenticationService);
    }

    getTodos(): Promise<Todo[] | null> {
        try {
            return this.queryDB(async (db, user) => {
                return await db.query.todoTable.findMany({
                    where: eq(todoTable.userId, user.id)
                }).execute() ?? null;
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get todos! ${e}`);
        }
    }

    getSingleTodo(): Promise<Todo | null> {
        try {
            return this.queryDB(async (db, user) => {
                return await db.query.todoTable.findFirst({
                    where: eq(todoTable.userId, user.id)
                }).execute() ?? null;
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get todo! ${e}`);
        }
    }

    createTodo(todo: TodoInsert): Promise<Todo | null> {
        try {
            return this.queryDB(async (db, user) => {
                return (await db.insert(todoTable).values(todo).returning().execute())[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to create todo! ${e}`);
        }
    }
}