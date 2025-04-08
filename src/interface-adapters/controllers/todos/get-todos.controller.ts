import {IGetTodosUseCase} from "@/src/application/use-cases/todos/get-todos.use-case";

export type IGetTodosController = ReturnType<typeof getTodosController>;

export const getTodosController = (
    getTodosUseCase: IGetTodosUseCase
)=> async () => {
    return getTodosUseCase();
}