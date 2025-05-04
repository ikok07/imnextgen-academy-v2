import {cn} from "@/app/_utils/cn";

export function primaryControlBackground(className?: string) {
    return cn(
        `h-max py-1.5 px-3 text-white dark:text-primary bg-gradient-to-b bg-main-gradient rounded-md`,
        className
    )
}