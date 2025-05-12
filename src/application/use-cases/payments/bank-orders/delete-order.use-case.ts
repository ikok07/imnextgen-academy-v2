import {IBankOrdersRepository} from "@/src/application/repositories/payments/bank-orders.repository.interface";

export type IDeleteOrderUseCase = ReturnType<typeof deleteOrderUseCase>;

export const deleteOrderUseCase = (
    bankOrdersRepository: IBankOrdersRepository
) => async (id: string) => {
    return bankOrdersRepository.deleteOrder(id);
}