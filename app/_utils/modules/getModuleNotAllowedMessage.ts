import {z} from "zod";
import {moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import {ModuleNotAllowedOptions} from "@/app/_components/dashboard/classroom/ModuleLockedMessage";
import {Routes} from "@/app/_utils/nav/routes";

export const getModuleNotAllowedOptionsSchema = z.object({
    productId: z.string().nullable(),
    moduleAccess: moduleAccessEnumSchema.exclude(["free"]),
});

export type GetModuleNotAllowedOptions = z.infer<typeof getModuleNotAllowedOptionsSchema>;

export function getModuleNotAllowedMessage({productId, moduleAccess}: GetModuleNotAllowedOptions): ModuleNotAllowedOptions {
    switch (moduleAccess) {
        case "subscription":
            return {
                description: "За да достъпиш модула, е необходимо да си закупиш абонамент",
                buttons: [
                    {
                        label: "Закупуване на абонамент",
                        href: Routes.dashboard.shop.base(),
                        variant: "primary"
                    }
                ]
            }
        case "paid":
            return {
                description: "За да достъпиш модула, е необходимо да го закупиш",
                buttons: [
                    {
                        label: "Закупуване на модул",
                        href: `${Routes.dashboard.shop.base()}${productId ? `?productIds=${productId}` : ""}`,
                        variant: "primary"
                    }
                ]
            }
        case "subscription-or-paid":
            return {
                description: "Модулът изисква абонамент или отделна покупка",
                buttons: [
                    {
                        label: "Закупуване на абонамент",
                        href: Routes.dashboard.shop.base(),
                        variant: "primary"
                    },
                    {
                        label: "Закупуване на модул",
                        href: `${Routes.dashboard.shop.base()}${productId ? `?productIds=${productId}` : ""}`,
                        variant: "secondary"
                    }
                ]
            }
        case "private":
            return {
                description: "Модулът е недостъпен за момента",
                buttons: undefined
            }
    }
}