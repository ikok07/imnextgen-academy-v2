import {cn} from "@/app/_utils/cn";

export function secondaryControlBackground(className?: string) {
    const gradient = "from-white to-gray-100 hover:to-gray-200 dark:from-white dark:to-gray-200 dark:hover:to-gray-300";

    return cn(
        `h-max py-1.5 px-3 text-primary dark:text-primary-foreground border border-gray-300 bg-gradient-to-b ${gradient} rounded-md transition-all duration-200`,
        className
    )
}