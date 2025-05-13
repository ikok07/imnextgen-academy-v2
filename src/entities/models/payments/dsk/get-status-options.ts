import {z} from "zod";

export enum DSKPaymentStatusEnum {
    CHOSEN_FINANCIAL_SCHEME = "1",
    APPLICATION_SUBMITTED = "2",
    SENT_TO_BANK = "3",
    UNABLE_TO_CONTACT_CUSTOMER = "4",
    APPLICATION_TERMINATED = "5",
    APPLICATION_CANCELED = "6",
    CONTRACT_SIGNED = "7",
    LOAN_TAKEN = "8"
}

export const getStatusOptionsSchema = z.object({
    orderId: z.string()
});

export const dskPaymentStatusSchema = z.object({
    orderid: z.string().optional(),
    status: z.custom<DSKPaymentStatusEnum>().optional(),
});

export type GetStatusOptions = z.infer<typeof getStatusOptionsSchema>;
export type DSKPaymentStatus = z.infer<typeof dskPaymentStatusSchema>;