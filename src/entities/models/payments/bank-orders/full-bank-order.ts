import {z} from "zod";
import {bankOrderSchema} from "@/drizzle/schema/bank_orders";
import {bankOrderProductSchema} from "@/drizzle/schema/bank_order_products";

export const fullBankOrder = bankOrderSchema.and(z.object({products: z.array(bankOrderProductSchema.omit({bank_order_id: true}))}));

export type FullBankOrder = z.infer<typeof fullBankOrder>;