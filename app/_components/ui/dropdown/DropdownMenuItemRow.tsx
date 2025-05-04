import {IconType} from "react-icons";
import Link from "next/link";
import {cn} from "@/app/_utils/cn";
import {DropdownMenuItem} from "@/app/_components/ui/shadcn/dropdown-menu";
import PrimaryLoader from "@/app/_components/ui/loaders/PrimaryLoader";
import {ReactNode} from "react";

type DropdownMenuItemRowLink = {
    type: "link"
    Icon?: IconType,
    label: string,
    additionalContent?: ReactNode,
    href: string,
    isLoading?: boolean,
    className?: string,
    iconClassName?: string
}
type DropdownMenuItemRowButton = {
    type: "button"
    Icon?: IconType,
    label: string,
    additionalContent?: ReactNode,
    onClick: () => void,
    isLoading?: boolean,
    className?: string,
    iconClassName?: string,
}

type DropdownMenuItemRowCustomeButton = {
    type: "custom-button",
    children: ReactNode,
    additionalContent?: ReactNode,
}

type DropdownMenuItemRowProps = DropdownMenuItemRowLink | DropdownMenuItemRowButton | DropdownMenuItemRowCustomeButton;

export default function DropdownMenuItemRow(props: DropdownMenuItemRowProps) {

    if (props.type === "custom-button") {
        return <DropdownMenuItem className="cursor-pointer group">
            <div className="flex items-center justify-between w-full">
                {props.children}
                {props.additionalContent}
            </div>
        </DropdownMenuItem>;
    }

    const className = cn(
        "flex items-center gap-3 w-full",
        props.className
    );

    const iconClassName = cn(
        "text-primary/50 group-hover:text-accent dark:group-hover:text-white",
        props.iconClassName
    )

    const Icon = props.Icon && <props.Icon className={iconClassName}/>;
    const Label = props.isLoading ? <PrimaryLoader className="w-[1rem]" /> : <span>{props.label}</span>;

    if (props.type === "link") {
        return <DropdownMenuItem className="cursor-pointer group">
            <div className="flex items-center justify-between w-full">
                <Link href={props.href} className={className}>
                    {Icon}
                    {Label}
                </Link>
                {props.additionalContent}
            </div>
        </DropdownMenuItem>
    }

    return <DropdownMenuItem className="cursor-pointer group" onClick={props.onClick}>
        <div className="flex items-center justify-between w-full">
            <button className={className}>
                {Icon}
                {Label}
            </button>
            {props.additionalContent}
        </div>
    </DropdownMenuItem>
}