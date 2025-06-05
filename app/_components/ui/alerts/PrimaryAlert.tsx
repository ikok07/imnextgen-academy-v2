import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/app/_components/ui/shadcn/alert-dialog";
import {ComponentProps, ReactNode} from "react";
import {cn} from "@/app/_utils/cn";

type PrimaryAlertProps = ComponentProps<typeof AlertDialog> & {
    trigger: ReactNode,
    title: string,
    description: string,
    cancel: {
        label: string,
        onClick?: () => void
    },
    accept: {
        label: string,
        onClick: () => void
    },
    triggerClassName?: string,
    titleClassName?: string,
    descriptionClassName?: string,
    cancelClassName?: string,
    acceptClassName?: string
};

export default function PrimaryAlert({trigger, title, description, cancel, accept, triggerClassName, titleClassName, descriptionClassName, cancelClassName, acceptClassName, ...props}: PrimaryAlertProps) {
    return <AlertDialog {...props}>
        <AlertDialogTrigger className={triggerClassName}>
            {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className={titleClassName}>{title}</AlertDialogTitle>
                <AlertDialogDescription className={descriptionClassName}>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel
                    className={cn(
                        "hover:bg-cta hover:text-white",
                        cancelClassName
                    )}
                    onClick={cancel.onClick}
                >
                    {cancel.label}
                </AlertDialogCancel>
                <AlertDialogAction
                    className={cn(
                        "bg-cta hover:bg-cta/80",
                        acceptClassName
                    )}
                    onClick={accept.onClick}
                >
                    {accept.label}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}