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
    getPendingOrders(userId?: string): Promise<RawOrderResponse> {
        try {
            return this.queryDB(db => {
                const baseQuery = db
                    .select({
                        product: bankOrderProductsTable,
                        order: bankOrdersTable
                    })
                    .from(bankOrdersTable)
                    .leftJoin(bankOrderProductsTable, eq(bankOrderProductsTable.bank_order_id, bankOrdersTable.id));

                const whereConditions = [eq(bankOrdersTable.status, "pending")];
                if (userId) whereConditions.push(eq(bankOrdersTable.profile_id, userId));

                return baseQuery.where(and(...whereConditions));
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
                    await tx.insert(bankOrderProductsTable).values(products.map(p => ({...p, bank_order_id: res[0].id}))).onConflictDoNothing();
                    return res[0];
                })
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create bank order: ${e}`);
        }
    }
    async updateOrder(id: string, data: Partial<BankOrderInsert>): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.update(bankOrdersTable).set(data).where(eq(bankOrdersTable.id, id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update bank order: ${e}`);
        }
    }

    updateOrderProduct(productId: string, data: Partial<BankOrderProductInsert>): Promise<void> {
        try {
            return this.queryDB(async db => {
                db.update(bankOrderProductsTable).set(data).where(eq(bankOrderProductsTable.id, productId));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update bank order product: ${e}`);
        }
    }

    async deleteOrder(id: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(bankOrdersTable).where(eq(bankOrdersTable.id, id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update bank order product: ${e}`);
        }
    }
}