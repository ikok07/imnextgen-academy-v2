import {Button} from "@/app/_components/ui/shadcn/button";
import {ComponentProps} from "react";
import Link from "next/link";
import { cn } from "@/app/_utils/cn";

type ShadowButtonProps = {
    href?: string
} & ComponentProps<"button">

export default function ShadowButton({children, href, onClick, disabled, className, ...props}: ShadowButtonProps) {
    const button = <Button
        className={
            cn(
                "h-max py-1.5 px-3",
                className
            )
        }
        variant="ghost"
        onClick={disabled ? () => {} : onClick}
        disabled={disabled}
        {...props}
    >
        {children}
    </Button>

    if (href) return <Link href={href}>{button}</Link>

    return button
}