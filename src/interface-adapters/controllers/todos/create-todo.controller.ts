import {ICreateTodoUseCase} from "@/src/application/use-cases/todos/create-todo.use-case";
import {TodoInsert, todoInsertSchema} from "@/drizzle/schema/todo";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateTodoController = ReturnType<typeof createTodoController>;

export const createTodoController = (
    createTodoUseCase: ICreateTodoUseCase
)=> async (todo: Partial<TodoInsert>)=> {
    const {data, error} = todoInsertSchema.safeParse(todo);
    if (error) throw new InputParseError(`Invalid todo! ${error}`);

    return createTodoUseCase(data);
}