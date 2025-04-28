"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {z} from "zod";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";

const shopState = z.object({
    selectedSubscriptionTier: z.custom<FullSubscriptionTier>().nullable(),
    setSelectedSubscriptionTier: z.custom<Dispatch<SetStateAction<FullSubscriptionTier | null>>>(),
    errorProductIds: z.set(z.string()),
    setErrorProductIds: z.custom<Dispatch<SetStateAction<Set<string>>>>()
});

export type ShopState = z.infer<typeof shopState>;

const ShopContext = createContext<ShopState | null>(null);

type ShopProviderProps = {
    children: ReactNode
}

export function ShopProvider({children}: ShopProviderProps) {
    const [selectedSubscriptionTier, setSelectedSubscriptionTier] = useState<FullSubscriptionTier | null>(null);
    const [errorProductIds, setErrorProductIds] = useState<Set<string>>(new Set());


    return <ShopContext.Provider value={{
        selectedSubscriptionTier,
        setSelectedSubscriptionTier,
        errorProductIds,
        setErrorProductIds
    }}>
        {children}
    </ShopContext.Provider>
}

export function useShop() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error("useShop must be used inside ShopProvider!");
    }
    return context;
}