"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {z} from "zod";
import {Module, modulesTableSchema} from "@/drizzle/schema/modules";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getModuleById} from "@/app/dashboard/actions";

export const adminManageModuleStateSchema = z.object({
    module: modulesTableSchema.optional(),
    isLoadingModule: z.boolean(),
    editMode: z.boolean(),
    setEditMode: z.custom<Dispatch<SetStateAction<boolean>>>(),
    errors: z.array(z.string()),
    setErrors: z.custom<Dispatch<SetStateAction<string[]>>>(),
    hasChanges: z.boolean(),
    setHasChanges: z.custom<Dispatch<SetStateAction<boolean>>>(),
    access: z.string().nullable(),
    setAccess: z.custom<Dispatch<SetStateAction<string | null>>>(),
    orderNumber: z.string().nullable(),
    setOrderNumber: z.custom<Dispatch<SetStateAction<string | null>>>(),
    stripeProductId: z.string().nullable(),
    setStripeProductId: z.custom<Dispatch<SetStateAction<string | null>>>(),
    nonDiscountedPriceId: z.string().nullable(),
    setNonDiscountedPriceId: z.custom<Dispatch<SetStateAction<string | null>>>()
});

export type AdminManageModuleState = z.infer<typeof adminManageModuleStateSchema>;

const AdminManageModuleContext = createContext<AdminManageModuleState | null>(null);

type AdminManageModuleProviderProps = {
    children: ReactNode,
    module: Module
}

export function AdminManageModuleProvider({children, module}: AdminManageModuleProviderProps) {
    const [editMode, setEditMode] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    const [access, setAccess] = useState<string | null>(module.access);
    const [orderNumber, setOrderNumber] = useState<string | null>(module.order_number.toString());
    const [stripeProductId, setStripeProductId] = useState<string | null>(module.stripe_product_id);
    const [nonDiscountedPriceId, setNonDiscountedPriceId] = useState<string | null>(module.non_discounted_price_id);

    const {data: moduleQuery, isLoading: isLoadingModule, isRefetching: isRefetchingModule} = useErrorQuery({
        queryFn: () => getModuleById(module.id),
        queryKey: ["module", module.id],
        initialData: {success: true, value: module}
    });

    const clientModule = useMemo(() => {
        if (moduleQuery?.success) return moduleQuery.value;
        // @ts-ignore
    }, [moduleQuery?.value, isLoadingModule, isRefetchingModule]);

    return <AdminManageModuleContext.Provider value={{
        module: clientModule,
        isLoadingModule,
        editMode,
        setEditMode,
        errors,
        setErrors,
        hasChanges,
        setHasChanges,
        access, setAccess,
        orderNumber, setOrderNumber,
        stripeProductId, setStripeProductId,
        nonDiscountedPriceId, setNonDiscountedPriceId
    }}>
        {children}
    </AdminManageModuleContext.Provider>
}

export function useAdminManageModule() {
    const context = useContext(AdminManageModuleContext);
    if (!context) {
        throw new Error("useAdminManageModule() must be used inside AdminManageModuleProvider!")
    }
    return context;
}