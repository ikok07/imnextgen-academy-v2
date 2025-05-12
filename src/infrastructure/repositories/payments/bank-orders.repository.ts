import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IBankOrdersRepository,
    RawOrderResponse
} from "@/src/application/repositories/payments/bank-orders.repository.interface";
import {BankOrder, BankOrderInsert, bankOrdersTable} from "@/drizzle/schema/bank_orders";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {and, eq} from "drizzle-orm";
import {BankOrderProductInsert, bankOrderProductsTable} from "@/drizzle/schema/bank_order_products";

export class BankOrdersRepository extends BaseRepository implements IBankOrdersRepository {
    getPendingOrders(userId: string): Promise<RawOrderResponse> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        product: bankOrderProductsTable,
                        order: bankOrdersTable
                    })
                    .from(bankOrdersTable)
                    .where(and(eq(bankOrdersTable.profile_id, userId), eq(bankOrdersTable.status, "pending")))
                    .leftJoin(bankOrderProductsTable, eq(bankOrderProductsTable.bank_order_id, bankOrdersTable.id))
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get pending bank orders: ${e}`);
        }
    }
    async createOrder(userId: string, products: Omit<BankOrderProductInsert, "bank_order_id">[]): Promise<BankOrder> {
        try {
            return this.queryDB(async db => {
                return db.transaction(async tx => {
                    const res = await tx.insert(bankOrdersTable).values({profile_id: userId, status: "pending"}).returning();
                    await tx.insert(bankOrderProductsTable).values(products.map(p => ({...p, bank_order_id: res[0].id})));
                    return res[0];
                })
            });
        } catch(e) {
            throw new DatabaseError(`Failed to get pending bank orders: ${e}`);
        }
    }
    updateOrder(id: string, data: Partial<BankOrderInsert>): Promise<void> {
        try {
            return this.queryDB(async db => {
                db.update(bankOrdersTable).set(data).where(eq(bankOrdersTable.id, id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get pending bank orders: ${e}`);
        }
    }

    // TODO: UpdateOrderProducts
    // TODO: DeleteOrder
}