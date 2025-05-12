import {IBankOrdersRepository} from "@/src/application/repositories/payments/bank-orders.repository.interface";
import {FullBankOrder} from "@/src/entities/models/payments/bank-orders/full-bank-order";

export type IGetPendingOrdersUseCase = ReturnType<typeof getPendingOrdersUseCase>;

export const getPendingOrdersUseCase = (
    bankOrdersRepository: IBankOrdersRepository
) => async (userId: string) => {
    const rawResults = await bankOrdersRepository.getPendingOrders(userId);

    const ordersMap: Map<string, FullBankOrder> = new Map([]);

    for (const result of rawResults) {
        if (!ordersMap.has(result.order.id)) {
            ordersMap.set(result.order.id, {
                ...result.order,
                products: []
            });
        }

        const order = ordersMap.get(result.order.id)!;

        if (result.product) order.products.push(result.product);
    }

    return Array.from(ordersMap.values());
}