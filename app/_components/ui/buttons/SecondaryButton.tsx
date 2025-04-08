import {Button} from "@/app/_components/ui/shadcn/button";
import {ComponentProps} from "react";
import Link from "next/link";
import {Loader2} from "lucide-react";
import {cn} from "@/app/_utils/cn";

type SecondaryButtonProps = {
    href?: string,
    loading?: boolean
} & ComponentProps<"button">

export default function SecondaryButton({children, href, onClick, disabled, loading, className, ...props}: SecondaryButtonProps) {
    const button = <Button
        variant="secondary"
        className={
            cn(
                "h-max py-1.5 px-3",
                className,
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