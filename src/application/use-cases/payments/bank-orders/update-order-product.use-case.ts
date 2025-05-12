import {IBankOrdersRepository} from "@/src/application/repositories/payments/bank-orders.repository.interface";
import {BankOrderProductInsert} from "@/drizzle/schema/bank_order_products";

export type IUpdateOrderProductUseCase = ReturnType<typeof updateOrderProductUseCase>;

export const updateOrderProductUseCase = (
    bankOrdersRepository: IBankOrdersRepository
) => async (productId: string, data: Partial<BankOrderProductInsert>) => {
    return bankOrdersRepository.updateOrderProduct(productId, data);
}