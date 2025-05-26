"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState} from "react";
import {z} from "zod";
import {FullSubscriptionTier} from "@/src/entities/models/payments/full-subscription-tier";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";
import {Module} from "@/drizzle/schema/modules";

const shopState = z.object({
    selectedSubscriptionTier: z.custom<FullSubscriptionTier>().nullable(),
    setSelectedSubscriptionTier: z.custom<Dispatch<SetStateAction<FullSubscriptionTier | null>>>(),
    selectedProductIds: z.set(z.string()),
    setSelectedProductIds: z.custom<Dispatch<SetStateAction<Set<string>>>>(),
    errorProductIds: z.set(z.string()),
    setErrorProductIds: z.custom<Dispatch<SetStateAction<Set<string>>>>(),
    clearCart: z.custom<() => void>(),
    alreadyBought:  z.custom<(boughtModules: FullBoughtModule[], moduleId: string) => boolean>(),
    moduleIncludedInSelectedSubscription: z.custom<(module: Module) => boolean>()
});

export type ShopState = z.infer<typeof shopState>;

const ShopContext = createContext<ShopState | null>(null);

type ShopProviderProps = {
    children: ReactNode
}

export function ShopProvider({children}: ShopProviderProps) {
    const [selectedSubscriptionTier, setSelectedSubscriptionTier] = useState<FullSubscriptionTier | null>(null);
    const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set());
    const [errorProductIds, setErrorProductIds] = useState<Set<string>>(new Set());

    function clearCart() {
        setSelectedSubscriptionTier(null);
        setSelectedProductIds(new Set());
    }
    
    const alreadyBought = useCallback((boughtModules: FullBoughtModule[], moduleId: string) => {
        return boughtModules.some(m => m.module.id === moduleId);
    }, []);

    const moduleIncludedInSelectedSubscription = useCallback((module: Module) => {
        return module.access === "subscription-or-paid" && !!selectedSubscriptionTier;
    }, [selectedSubscriptionTier]);

    return <ShopContext.Provider value={{
        selectedSubscriptionTier,
        setSelectedSubscriptionTier,
        selectedProductIds,
        setSelectedProductIds,
        errorProductIds,
        setErrorProductIds,
        clearCart,
        alreadyBought,
        moduleIncludedInSelectedSubscription
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