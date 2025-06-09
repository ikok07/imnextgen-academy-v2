"use client"

import Image from "next/image";
import AdminUserDetailRow from "@/app/_components/dashboard/admin/users/modal/AdminUserDetailRow";
import {IoCall, IoCard, IoIdCard} from "react-icons/io5";
import PrimaryAlert from "@/app/_components/ui/alerts/PrimaryAlert";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {useRouter} from "next/navigation";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteUser} from "@/app/dashboard/admin/actions";
import {toast} from "sonner";
import {Dispatch, SetStateAction} from "react";
import {useQueryClient} from "react-query";

type AdminUserDetailsInfoColumnProps = {
    fullProfile: FullProfile,
    setOpenedUserDetails: Dispatch<SetStateAction<string | null>>
}

export default function AdminUserDetailsInfoColumn({fullProfile, setOpenedUserDetails}: AdminUserDetailsInfoColumnProps) {
    const queryClient = useQueryClient();
    const router = useRouter();

    const {mutate: deleteUserMethod, isLoading: isDeletingUser} = useErrorMutation({
        mutationFn: () => deleteUser(fullProfile.id),
        onError() {
            toast.error("Профилът не може да бъде изтрит!");
        },
        onSuccess() {
            toast.success("Потребителят беше изтрит!");
            setOpenedUserDetails(null);
            queryClient.invalidateQueries(["allProfiles"]);
        }
    });

    return  <div className="grid grid-rows-[auto_1fr_auto] space-y-5">
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
}