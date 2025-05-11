import {z} from "zod";

const calculationForAllSchemesDirectPriceOptionsSchema = z.object({
    price: z.string(),
    productIds: z.undefined(),
    productId: z.string(),
    initialPayment: z.string()
});

const calculationForAllSchemesFromProductIdsOptionsSchema = z.object({
    price: z.undefined(),
    productIds: z.array(z.string()),
    productId: z.string(),
    initialPayment: z.string()
});

export const calculationForAllSchemesOptionsSchema = calculationForAllSchemesDirectPriceOptionsSchema.or(calculationForAllSchemesFromProductIdsOptionsSchema);

export const calculationForSchemeSchema = z.object({
    id: z.number(),
    name: z.string(),
    default: z.string(),
    total_price: z.string(),
    initial_payment: z.string(),
    total_loan_amount: z.string(),
    monthly_payment: z.string(),
    total_amount_due: z.string(),
    gpr: z.string(),
    glp: z.string()
})

export const calculationForAllSchemesSchema = z.record(z.string(),calculationForSchemeSchema);

export type CalculationForAllSchemesOptions = z.infer<typeof calculationForAllSchemesOptionsSchema>;
export type CalculationForScheme = z.infer<typeof calculationForSchemeSchema>;
export type CalculationForAllSchemes = z.infer<typeof calculationForAllSchemesSchema>;