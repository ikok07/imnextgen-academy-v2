import {Todo, TodoInsert} from "@/drizzle/schema/todo";

export interface ITodosRepository {
    getTodos(): Promise<Todo[] | null>;
    getSingleTodo(): Promise<Todo | null>;
    createTodo(todo: TodoInsert): Promise<Todo | null>;
}