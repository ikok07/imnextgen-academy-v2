import {z} from "zod";
import {moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import {ModuleNotAllowedOptions} from "@/app/_components/dashboard/classroom/ModuleLockedMessage";

export const getModuleNotAllowedOptionsSchema = z.object({
    moduleId: z.string().uuid(),
    moduleAccess: moduleAccessEnumSchema.exclude(["free"]),
});

export type GetModuleNotAllowedOptions = z.infer<typeof getModuleNotAllowedOptionsSchema>;

export function getModuleNotAllowedMessage({moduleId, moduleAccess}: GetModuleNotAllowedOptions): ModuleNotAllowedOptions {
    switch (moduleAccess) {
        case "subscription":
            return {
                description: "За да достъпиш модула, е необходимо да си закупиш абонамент",
                buttons: [
                    {
                        label: "Закупуване на абонамент",
                        href: "/dashboard",
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
                        href: `/dashboard/${moduleId}`,
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
                        href: "/dashboard",
                        variant: "primary"
                    },
                    {
                        label: "Закупуване на модул",
                        href: `/dashboard/${moduleId}`,
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