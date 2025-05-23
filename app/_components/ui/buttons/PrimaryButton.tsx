import {Button} from "@/app/_components/ui/shadcn/button";
import {ComponentProps} from "react";
import Link from "next/link";
import {Loader2} from "lucide-react";
import { cn } from "@/app/_utils/cn";
import {primaryControlBackground} from "@/app/_components/ui/backgrounds/primaryControlBackground";

type PrimaryButtonProps = {
    href?: string,
    loading?: boolean,
    loadingText?: string,
    linkClassName?: string
} & ComponentProps<"button">

export default function PrimaryButton({children, href, onClick, disabled, loading, loadingText, linkClassName, className, ...props}: PrimaryButtonProps) {
    const button = <Button
        className={
            cn(
                primaryControlBackground(className),
                className,
                {
                    "cursor-not-allowed from-gray-400 to-gray-600 hover:from-gray-400 hover:to-gray-600 dark:from-gray-500 dark:to-gray-700 dark:text-white dark:hover:from-gray-400 dark:hover:to-gray-600": loading || disabled
                }
            )
        }
        onClick={disabled || loading ? () => {} : onClick}
        disabled={disabled}
        {...props}
    >
        {loading && <Loader2 className="animate-spin"/>}
        {loading && loadingText ? loadingText : children}
    </Button>

    if (href) return <Link href={href} className={cn(linkClassName)}>{button}</Link>

    return button
}