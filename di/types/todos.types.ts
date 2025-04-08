import {ITodosRepository} from "@/src/application/repositories/todoes.repository.interface";
import {ICreateTodoUseCase} from "@/src/application/use-cases/todos/create-todo.use-case";
import {ICreateTodoController} from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import {IGetTodosController} from "@/src/interface-adapters/controllers/todos/get-todos.controller";
import {IGetTodosUseCase} from "@/src/application/use-cases/todos/get-todos.use-case";

export const TODOS_SYMBOLS = {
    ITodosRepository: Symbol.for("ITodosRepository"),
    IGetTodosUseCase: Symbol.for("IGetTodosUseCase"),
    ICreateTodoUseCase: Symbol.for("ICreateTodoUseCase"),
    IGetTodosController: Symbol.for("IGetTodosController"),
    ICreateTodoController: Symbol.for("ICreateTodoController"),
}

export interface TODOS_RETURN_TYPES {
    ITodosRepository: ITodosRepository,
    IGetTodosUseCase: IGetTodosUseCase,
    ICreateTodoUseCase: ICreateTodoUseCase,
    ICreateTodoController: ICreateTodoController,
    IGetTodosController: IGetTodosController,
}