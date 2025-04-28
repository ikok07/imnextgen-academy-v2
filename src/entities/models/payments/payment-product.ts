import {z} from "zod";

export const paymentProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().nullable().optional(),
    currency: z.string().nullable().optional()
});

export type PaymentProduct = z.infer<typeof paymentProductSchema>;