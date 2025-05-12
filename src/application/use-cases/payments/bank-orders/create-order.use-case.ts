import { BankOrderProductInsert } from "@/drizzle/schema/bank_order_products";
import {IBankOrdersRepository} from "@/src/application/repositories/payments/bank-orders.repository.interface";

export type ICreateOrderUseCase = ReturnType<typeof createOrderUseCase>;

export const createOrderUseCase = (
    bankOrdersRepository: IBankOrdersRepository,
) => (userId: string, products: Omit<BankOrderProductInsert, "bank_order_id">[]) => {
    return bankOrdersRepository.createOrder(userId, products);
}