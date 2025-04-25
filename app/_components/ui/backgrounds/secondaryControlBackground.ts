import {cn} from "@/app/_utils/cn";

export function secondaryControlBackground(className?: string) {
    return cn(
        `h-max py-1.5 px-3 text-primary border border-gray-300 dark:border-gray-900 bg-secondary-gradient hover:to-gray-200 hover:dark:from-gray-700 hover:dark:to-gray-800 rounded-md transition-all duration-200`,
        className
    )
}