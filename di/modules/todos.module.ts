import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {TodosRepository} from "@/src/infrastructure/repositories/todos/todos.repository";
import {createTodoUseCase} from "@/src/application/use-cases/todos/create-todo.use-case";
import {createTodoController} from "@/src/interface-adapters/controllers/todos/create-todo.controller";
import {getTodosUseCase} from "@/src/application/use-cases/todos/get-todos.use-case";
import {getTodosController} from "@/src/interface-adapters/controllers/todos/get-todos.controller";

export function createTodosModule() {
    const todosModule = createModule();

    todosModule
        .bind(DI_SYMBOLS.ITodosRepository)
        .toClass(TodosRepository, [DI_SYMBOLS.IAuthenticationService]);

    todosModule
        .bind(DI_SYMBOLS.IGetTodosUseCase)
        .toHigherOrderFunction(getTodosUseCase, [DI_SYMBOLS.ITodosRepository]);

    todosModule
        .bind(DI_SYMBOLS.ICreateTodoUseCase)
        .toHigherOrderFunction(createTodoUseCase, [DI_SYMBOLS.ITodosRepository]);

    todosModule
        .bind(DI_SYMBOLS.IGetTodosController)
        .toHigherOrderFunction(getTodosController, [DI_SYMBOLS.IGetTodosUseCase]);

    todosModule
        .bind(DI_SYMBOLS.ICreateTodoController)
        .toHigherOrderFunction(createTodoController, [DI_SYMBOLS.ICreateTodoUseCase]);

    return todosModule;
}