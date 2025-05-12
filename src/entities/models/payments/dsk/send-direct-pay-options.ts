import {z} from "zod"

export const directPayOptionsItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    quantity: z.string(),
    price: z.string(),
    image: z.string()
})

export const sendDirectPayOptionsSchema = z.object({
    orderId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
    city: z.string(),
    postCode: z.string(),
    price: z.string(),
    period: z.number().min(3).max(48),
    monthlyPayment: z.string(),
    gpr: z.string(),
    personalId: z.string(),
    initialPayment: z.string(),
    glp: z.string(),
    items: z.array(directPayOptionsItemSchema)
});

export const sendDirectPayResultsSchema = z.object({
    message: z.string(),
    error: z.string().optional(),
    bank_order_id: z.string(),
    shop_order_id: z.string(),
    bank_status: z.string()
});

export type DirectPayOptionsItem = z.infer<typeof directPayOptionsItemSchema>;
export type SendDirectPayOptions = z.infer<typeof sendDirectPayOptionsSchema>;

export type SendDirectPayResults = z.infer<typeof sendDirectPayResultsSchema>;