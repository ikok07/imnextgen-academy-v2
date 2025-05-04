"use client"

import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useRouter} from "next/navigation";
import {useShop} from "@/app/_providers/ShopProvider";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {useEffect} from "react";

export default function SuccessfulPaymentClassroomButton() {
    const {viewLoaded} = useViewLoaded();
    const router = useRouter();
    const {selectedSubscriptionTier, selectedProductIds, clearCart} = useShop();

    function handleClick() {
        router.push(Routes.dashboard.classroom.base);
    }

    useEffect(() => {
        if (!selectedSubscriptionTier && selectedProductIds.size === 0) {
            router.push(Routes.dashboard.classroom.base);
        } else {
            clearCart();
        }
    }, []);

    if (!viewLoaded) return <Skeleton className="w-[7rem] h-[2rem]" />

    return <PrimaryButton
        onClick={handleClick}
    >
        Класна стая
    </PrimaryButton>
}