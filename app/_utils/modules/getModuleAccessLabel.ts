import {z} from "zod";
import {moduleAccessEnumSchema} from "@/drizzle/schema/modules";

export function getModuleAccessLabel(access: z.infer<typeof moduleAccessEnumSchema>) {
    switch (access) {
        case "free":
            return "Безплатен";
        case "subscription":
            return "С абонамент";
        case "paid":
            return "Платен";
        case "subscription-or-paid":
            return "Абонамент или покупка";
        case "private":
            return "Частен";
        case "pre-order":
            return "Предварителна поръчка";
        default:
            return "Непознат достъп";
    }
}
