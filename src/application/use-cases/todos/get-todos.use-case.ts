import {ITodosRepository} from "@/src/application/repositories/todoes.repository.interface";

export type IGetTodosUseCase = ReturnType<typeof getTodosUseCase>;

export const getTodosUseCase = (
    todosRepository: ITodosRepository
) => () => {
    return todosRepository.getTodos();
}