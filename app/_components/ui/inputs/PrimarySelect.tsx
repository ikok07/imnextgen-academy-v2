"use client"

import { Label } from "../shadcn/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../shadcn/select"
import {ComponentProps} from "react";

type PrimarySelectProps = ComponentProps<typeof Select> & {options: {label?: string, value: string}[], label?: string, placeholder?: string, defaultValue?: string, className?: string}

export default function PrimarySelect({options, label, placeholder, defaultValue, className, ...props}: PrimarySelectProps) {
    return <div className={className}>
        <Label className="mb-0.5">{label}</Label>
        <Select {...props}>
            <SelectTrigger defaultValue={defaultValue}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => {
                    return <SelectItem value={option.value} key={index}>{option?.label ?? option.value}</SelectItem>
                })}
            </SelectContent>
        </Select>
    </div>
}