"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {z} from "zod";

export const PAYMENT_OPTIONS: readonly [string, ...string[]]= ["pay-stripe", "credit-dsk"];
export const paymentOptionEnum = z.enum(PAYMENT_OPTIONS);

export const paymentPageState = z.object({
    selectedPaymentOption: paymentOptionEnum,
    setSelectedPaymentOption: z.custom<Dispatch<SetStateAction<z.infer<typeof paymentOptionEnum>>>>()
});

export type PaymentOption = z.infer<typeof paymentOptionEnum>;
export type PaymentPageState = z.infer<typeof paymentPageState>;

const PaymentPageContext = createContext<PaymentPageState | null>(null);

type PaymentPageProviderProps = {
    children: ReactNode
}

export function PaymentPageProvider({children}: PaymentPageProviderProps) {
    const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOption>("credit-dsk");

    return <PaymentPageContext.Provider value={{selectedPaymentOption, setSelectedPaymentOption}}>
        {children}
    </PaymentPageContext.Provider>
}

export function usePaymentPage() {
    const context = useContext(PaymentPageContext);
    if (!context) {
        throw new Error("usePaymentPage should be used inside PaymentPageProvider");
    }
    return context;
}