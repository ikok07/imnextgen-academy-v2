import {IBankOrdersRepository} from "@/src/application/repositories/payments/bank-orders.repository.interface";
import {BankOrderInsert} from "@/drizzle/schema/bank_orders";

export type IUpdateOrderUseCase = ReturnType<typeof updateOrderUseCase>;

export const updateOrderUseCase = (
    bankOrdersRepository: IBankOrdersRepository
) => (id: string, data: Partial<BankOrderInsert>) => {
    return bankOrdersRepository.updateOrder(id, data);
}