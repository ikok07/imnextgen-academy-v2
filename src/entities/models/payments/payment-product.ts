import {z} from "zod";

export const paymentProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().nullable().optional(),
    secondaryPrices: z.record(z.string(), z.number()),
    currency: z.string().nullable().optional(),
    image: z.string().optional().nullable()
});

export type PaymentProduct = z.infer<typeof paymentProductSchema>;