import {PaymentOption} from "@/app/_providers/PaymentPageProvider";
import {z} from "zod";
import {IconType} from "react-icons";
import {IoCalendar, IoCard} from "react-icons/io5";

export const paymentOptionDataSchema = z.object({
    icon: z.custom<IconType>(),
    label: z.string()
});

export type PaymentOptionData = z.infer<typeof paymentOptionDataSchema>;

export function getPaymentOptionData(option: PaymentOption): PaymentOptionData | undefined {
    switch (option) {
        case "pay-stripe":
            return {
                icon: IoCard,
                label: "Карта"
            }
        case "credit-dsk":
            return {
                icon: IoCalendar,
                label: "ДСК Банк"
            }
    }
}