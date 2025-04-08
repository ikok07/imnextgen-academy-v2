"use client"

import {ComponentProps} from "react";
import {Input} from "@/app/_components/ui/shadcn/input";
import {Label} from "@/app/_components/ui/shadcn/label";
import { cn } from "@/app/_utils/cn";

type PrimaryInputProps = {
    label?: string,
    error?: string
} & ComponentProps<typeof Input>

export default function PrimaryInput({label, error, className, ...props}: PrimaryInputProps) {
    return <div className={`${error ? "text-red-500" : ""}`}>
        <div className="mb-0.5">{label && <Label>{label}</Label>}</div>
        <Input
            className={cn(
                "focus-visible:ring-cta dark:focus-visible:ring-cta",
                className,
                {
                    "border-red-500 focus-visible:ring-transparent dark:border-red-500 dark:focus-visible:ring-transparent": error
                }
            )}
            {...props}
        />
        <div className={`${error ? "h-5" : "h-0"} transition-all duration-300`}>
            <small
                className={
                    cn(
                        "hidden pt-1 animate-in ease-in-out fade-in slide-in-from-bottom-2 duration-300 pl-1",
                        {
                            "block": error
                        }
                    )
                }
            >
                {error}
            </small>
        </div>
    </div>
}