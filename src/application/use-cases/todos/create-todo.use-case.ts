import {TodoInsert} from "@/drizzle/schema/todo";
import {ITodosRepository} from "@/src/application/repositories/todoes.repository.interface";

export type ICreateTodoUseCase = ReturnType<typeof createTodoUseCase>;

export const createTodoUseCase = (
    todosRepository: ITodosRepository
) => async (todo: TodoInsert) => {
    return todosRepository.createTodo(todo);
}