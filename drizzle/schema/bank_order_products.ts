import {pgTable, text, unique} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {z} from "zod";
import {bankOrdersTable} from "@/drizzle/schema/bank_orders";

export const bankOrderProductsTable = pgTable("bank_order_products", {
    id: text("id").notNull().primaryKey().default(sql`gen_random_uuid()`),
    bank_order_id: text("bank_order_id").notNull().references(() => bankOrdersTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    }),
    product_id: text("product_id").notNull()
}, (table) => {
    return {
        bank_order_product_unique: unique().on(table.bank_order_id, table.product_id)
    }
});

export const bankOrderProductSchema = createSelectSchema(bankOrderProductsTable);
export type BankOrderProduct = z.infer<typeof bankOrderProductSchema>;

export const bankOrderProductInsertSchema = createInsertSchema(bankOrderProductsTable);
export type BankOrderProductInsert = z.infer<typeof bankOrderProductInsertSchema>;