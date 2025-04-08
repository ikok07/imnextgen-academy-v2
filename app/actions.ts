"use server"

import {getInjection} from "@/di/container";
import {CheckUserAccessOptions} from "@/src/application/services/auth/authorization.service.interface";
import {createServerAction} from "@/app/_utils/createServerAction";
import {TodoInsert} from "@/drizzle/schema/todo";
import {AuthenticationError} from "@/src/entities/errors/auth/authentication";

export const checkAccess = createServerAction((async (opts: Partial<CheckUserAccessOptions>) => {
    try {
        const checkAccessController = getInjection("ICheckAccessController");
        return await checkAccessController(opts);
    } catch(e) {
        return false;
    }
}));

export const getTodos = createServerAction(async () => {
    try {
        const getTodosController = getInjection("IGetTodosController");
        return await getTodosController();
    } catch(e) {
        if (!(e instanceof AuthenticationError)) throw e;
    }
})

export const createTodo = createServerAction(async (todo: Partial<TodoInsert>) => {
    const createTodoController = getInjection("ICreateTodoController");
    return await createTodoController(todo);
})