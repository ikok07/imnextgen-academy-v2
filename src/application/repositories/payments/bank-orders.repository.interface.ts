import {BankOrder, BankOrderInsert, bankOrderSchema} from "@/drizzle/schema/bank_orders";
import {z} from "zod";
import {BankOrderProductInsert, bankOrderProductSchema} from "@/drizzle/schema/bank_order_products";

export const rawOrderResponseSchema = z.array(z.object({
    product: bankOrderProductSchema.nullable(),
    order: bankOrderSchema
}));

export type RawOrderResponse = z.infer<typeof rawOrderResponseSchema>;

export interface IBankOrdersRepository {
    getPendingOrders(userId?: string): Promise<RawOrderResponse>
    createOrder(userId: string, products: Omit<BankOrderProductInsert, "bank_order_id">[]): Promise<BankOrder>
    updateOrder(id: string, data: Partial<BankOrderInsert>): Promise<void>
    updateOrderProduct(productId: string, data: Partial<BankOrderProductInsert>): Promise<void>
    deleteOrder(id: string): Promise<void>
}