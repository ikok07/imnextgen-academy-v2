import {Button} from "@/app/_components/ui/shadcn/button";
import {ComponentProps} from "react";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {cn} from "@/app/_utils/cn";
import {secondaryControlBackground} from "@/app/_components/ui/backgrounds/secondaryControlBackground";

type SecondaryButtonProps = {
    href?: string,
    loading?: boolean
} & ComponentProps<"button">

export default function SecondaryButton({children, href, onClick, disabled, loading, className, ...props}: SecondaryButtonProps) {
    const button = <Button
        className={
            cn(
                secondaryControlBackground(className),
                "truncate",
                {
                    "cursor-not-allowed opacity-50": loading || disabled
                }
            )
        }
        onClick={disabled || loading ? () => {} : onClick}
        {...props}
    >
        {loading && <Loader2 className="animate-spin"/>}
        {children}
    </Button>

    if (href) return <Link href={href}>{button}</Link>

    return button;
}