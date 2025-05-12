import {IUpdateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/update-order.use-case";
import {BankOrderInsert} from "@/drizzle/schema/bank_orders";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateOrderController = ReturnType<typeof updateOrderController>;

export const updateOrderController = (
    updateOrderUseCase: IUpdateOrderUseCase
) => async (orderId: string | undefined, data: Partial<BankOrderInsert>) => {
    if (!orderId) throw new InputParseError("Invalid orderId!");

    return updateOrderUseCase(orderId, data);
}