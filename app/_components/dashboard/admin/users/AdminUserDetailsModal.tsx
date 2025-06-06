"use client"

import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/app/_components/ui/shadcn/dialog";
import {IoCall, IoCard, IoClose, IoIdCard} from "react-icons/io5";
import Image from "next/image";
import AdminUserDetailRow from "@/app/_components/dashboard/admin/users/AdminUserDetailRow";
import {useRouter} from "next/navigation";
import PrimaryAlert from "@/app/_components/ui/alerts/PrimaryAlert";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteUser} from "@/app/dashboard/admin/actions";
import {toast} from "sonner";

type AdminUserDetailsModalProps = {
    fullProfile: FullProfile
}

export default function AdminUserDetailsModal({fullProfile}: AdminUserDetailsModalProps) {
    const router = useRouter();

    const {mutate: deleteUserMethod, isLoading: isDeletingUser} = useErrorMutation({
        mutationFn: () => deleteUser(fullProfile.id),
        onError() {
            toast.error("Профилът не може да бъде изтрит!");
        }
    });

    return <DialogContent className="[&>button:last-child]:hidden grid grid-rows-[auto_1fr] w-[85%] max-w-[60rem] h-[80vh]">
        <DialogHeader className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">
                    Управление на потребител
                </DialogTitle>
                <DialogClose><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></DialogClose>
            </div>
            <DialogDescription>Панел за управление на данните на потребителя</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-[1fr_2.5fr]">
            <div className="grid grid-rows-[auto_1fr_auto] space-y-5">
                <div>
                    {fullProfile.image_url && <div className="relative w-[4rem] aspect-square rounded-full overflow-hidden"><Image alt={fullProfile.name} src={fullProfile.image_url} fill className="object-cover" /></div>}
                    <h4 className="font-bold text-lg mt-2">{fullProfile.name}</h4>
                    <p className="text-sm text-primary/70">{fullProfile.email}</p>
                </div>
                <div className="space-y-3">
                    <AdminUserDetailRow Icon={IoCall} label="Телефон" value={fullProfile.phone} onClick={() => router.replace(`tel:${fullProfile.phone}`)} />
                    <AdminUserDetailRow Icon={IoIdCard} label="Роли" value={fullProfile.roles.join(" / ")} />
                    <AdminUserDetailRow Icon={IoCard} label="Stripe Customer ID" value={fullProfile.payment_customer_id ?? "Не е налично"} />
                </div>
                <PrimaryAlert
                    title="Сигурен ли си?"
                    description="След изтриване потребителят не може да бъде възстановен"
                    trigger={<PrimaryButton className="bg-red-500 hover:bg-red-600 w-full" loading={isDeletingUser}>Изтриване</PrimaryButton>}
                    accept={{
                        label: "Потвърждаване",
                        onClick: () => deleteUserMethod()
                    }}
                    acceptClassName="bg-red-500 hover:bg-red-600"
                    cancel={{
                        label: "Отказ"
                    }}
                />
            </div>
        </div>
    </DialogContent>
}