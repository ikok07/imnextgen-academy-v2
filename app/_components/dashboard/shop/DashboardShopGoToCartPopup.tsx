"use client"

import {IoCart} from "react-icons/io5";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {useShop} from "@/app/_providers/ShopProvider";
import {useMemo} from "react";
import {useRouter} from "next/navigation";
import { Routes } from "@/app/_utils/nav/routes";

export default function DashboardShopGoToCartPopup() {
    const router = useRouter();

    const {selectedSubscriptionTier, setSelectedSubscriptionTier, selectedProductIds, setSelectedProductIds} = useShop();
    const isActive = useMemo(() => !!selectedSubscriptionTier || selectedProductIds.size > 0, [selectedSubscriptionTier, selectedProductIds]);

    return <div className="fixed w-[95%] max-w-[25rem] left-[50%] bottom-3 -translate-x-1/2 z-20">
        <div className={`${isActive ? "visible animate-in slide-in-from-bottom" : "invisible animate-out slide-out-to-bottom"} flex flex-col xs:flex-row items-center justify-between gap-y-2 bg-black-gradient rounded-lg xs:rounded-full text-background py-3 xs:py-2 px-3 fade-out duration-300 transform-gpu`}>
            <div className="flex items-center gap-1">
                <IoCart />
                <p className="text-[0.9rem]">Избрани продукти: {selectedProductIds.size + (!!selectedSubscriptionTier ? 1 : 0)}</p>
            </div>
            <div className="flex items-center gap-2">
                <SecondaryButton
                    className="px-2 py-1 rounded-full text-[0.8rem] border-none"
                    onClick={() => {
                        setSelectedSubscriptionTier(null);
                        setSelectedProductIds(new Set());
                    }}
                >
                    Отмяна
                </SecondaryButton>
                <PrimaryButton
                    className="px-2 py-1 rounded-full text-[0.8rem]"
                    onClick={() => router.push(Routes.dashboard.shop.payment(
                        selectedSubscriptionTier ?
                            [selectedSubscriptionTier.stripe_product_id, ...selectedProductIds.values().toArray()] :
                            [...selectedProductIds.values().toArray()],
                        !!selectedSubscriptionTier
                    ))}
                >
                    Купуване
                </PrimaryButton>
            </div>
        </div>
    </div>
}