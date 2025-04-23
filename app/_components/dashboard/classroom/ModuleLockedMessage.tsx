import {IoDocumentLock} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {z} from "zod";
import {cn} from "@/app/_utils/cn";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";

export const moduleNotAllowedOptionsSchema = z.object({
    description: z.string(),
    buttons: z.array(z.object({
        label: z.string(),
        href: z.string(),
        variant: z.enum(["primary", "secondary"]),
        className: z.string().optional()
    })),
});

export type ModuleNotAllowedOptions = z.infer<typeof moduleNotAllowedOptionsSchema>;

type ModuleLockedMessageProps = {
    options: ModuleNotAllowedOptions
}

export default function ModuleLockedMessage({options}: ModuleLockedMessageProps) {
    return <div className="absolute inset-0 z-20 px-3 py-2 pb-3">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-white z-10"/>
        <div className="relative w-full h-full flex flex-col justify-between z-20">
            <div className="flex flex-col items-center justify-center text-center">
                <IoDocumentLock className="text-3xl text-cta"/>
                <h2 className="text-lg font-bold">Модулът е заключен</h2>
                <p className="text-sm text-primary/60">{options.description}</p>
            </div>
            <div className="w-full flex flex-col gap-y-2 gap-x-3 mt-3">
                {options.buttons.map((button, index) => {
                    const Button = button.variant === "primary" ? PrimaryButton : SecondaryButton;
                    return <Button className={cn("w-full", button.className)} href={button.href} key={index}>{button.label}</Button>
                })}
            </div>
        </div>
    </div>
}