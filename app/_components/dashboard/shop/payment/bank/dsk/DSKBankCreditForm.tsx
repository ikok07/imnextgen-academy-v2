"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useMemo, useState} from "react";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import BankFormSkeleton from "@/app/_components/dashboard/shop/payment/skeleton/BankFormSkeleton";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getCalculationForAllSchemes} from "@/app/dashboard/shop/payment/actions";
import {z} from "zod"
import {useDebounce} from "@react-hook/debounce";
import DskBankCreditFormInitialFields
    from "@/app/_components/dashboard/shop/payment/bank/dsk/DSKBankCreditFormInitialFields";
import DskBankCreditFormCalculationBoxes
    from "@/app/_components/dashboard/shop/payment/bank/dsk/DSKBankCreditFormCalculationBoxes";
import DskBankCreditFormPersonalDataFields
    from "@/app/_components/dashboard/shop/payment/bank/dsk/DSKBankCreditFormPersonalDataFields";
import {toast} from "sonner";
import {getPaymentProductsById} from "@/app/dashboard/shop/actions";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import PrimaryCheckbox from "@/app/_components/ui/checkboxes/PrimaryCheckbox";
import DskBankCreditFormCheckmarks from "@/app/_components/dashboard/shop/payment/bank/dsk/DSKBankCreditFormCheckmarks";

type DskBankCreditFormProps = {
    productIds: string[]
}

export default function DSKBankCreditForm({productIds}: DskBankCreditFormProps) {
    const {viewLoaded} = useViewLoaded();
    const [errors, setErrors] = useState<string[]>([]);

    const [debouncedInitialPayment, setDebouncedInitialPayment] = useDebounce<string | null>(null, 1000, false);
    const [debouncedPeriodString, setDebouncedPeriodString] = useDebounce<string | null>(null, 1000, false);
    const [address, setAddress] = useState<string | null>(null);
    const [personalId, setPersonalId] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [zipCode, setZipCode] = useState<string | null>(null);
    const [checkedOptions, setCheckedOptions] = useState(new Set<string>());

    const {data: allProductsQuery, isLoading: isGettingAllProducts} = useErrorQuery({
        queryFn: () => getPaymentProductsById(productIds),
        queryKey: ["payment-all-products"]
    });

    const totalPrice = useMemo(() => {
        return allProductsQuery?.success ? allProductsQuery.value.reduce((prev, curr) => {
            if (!curr.price) return prev;
            return prev + (curr.price / 100);
        }, 0) : undefined
    }, [allProductsQuery]);

    const validInitialPayment = useMemo(() => {
        if (!totalPrice || !debouncedInitialPayment) return false;
        const {error} = z.coerce.number().min(0).max(totalPrice).safeParse(debouncedInitialPayment);
        return !error;
    }, [debouncedInitialPayment]);

    const validPeriod = useMemo(() => {
        const {error} = z.coerce.number().min(3).max(48).safeParse(debouncedPeriodString);
        return !error;
    }, [debouncedPeriodString]);

    const {data: calculationResultsQuery, isLoading: isGettingCalculations, isRefetching: isRefetchingCalculations} = useErrorQuery({
        queryFn: () => getCalculationForAllSchemes({
            price: totalPrice?.toString(),
            productId: productIds.reduce((prev, curr) => `${prev}-${curr}`, "ids"),
            initialPayment: debouncedInitialPayment ?? undefined
        }),
        queryKey: ["dsk-calculation-for-all-schemes", debouncedInitialPayment],
        enabled: validInitialPayment && validPeriod,
        onError() {
            toast.error("Лизингодателят няма кредитна оферта за тази първоначална вноска")
        }
    });

    const isLoading = useMemo(() => {
        return isGettingCalculations || isRefetchingCalculations || isGettingAllProducts;
    }, [isGettingCalculations, isRefetchingCalculations, isGettingAllProducts]);

    const selectedPeriodCalculations = useMemo(() => {
        if (validInitialPayment && validPeriod && calculationResultsQuery?.success) {
            return calculationResultsQuery.value[debouncedPeriodString!];
        }
    }, [validInitialPayment, validPeriod, calculationResultsQuery]);

    if (!viewLoaded) return <BankFormSkeleton />

    return <Card className="h-max">
        <CardHeader>
            <div className="space-y-0.5">
                <Image alt="DSK Bank" src="/banks/dsk-logo.png" width={150} height={100}/>
                <CardTitle className="text-xl">Разсрочено плащане</CardTitle>
                <CardDescription className="text-[1rem]">Възползвай се от възможността за плащане на подходящи месечни вноски</CardDescription>
            </div>
            <div className="mt-6">
                <p className="text-primary/70">Главница</p>
                {totalPrice ? <h1 className="text-2xl font-black uppercase">
                    {totalPrice.toFixed(2).replace('.', ',')} лв.
                </h1> : <Skeleton className="w-[30%] h-[2rem]" />}
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                <DskBankCreditFormInitialFields
                    errors={errors}
                    setErrors={setErrors}
                    setDebouncedInitialPayment={setDebouncedInitialPayment}
                    setDebouncedPeriodString={setDebouncedPeriodString}
                    isLoading={isLoading}
                    maxInitialPayment={totalPrice}
                />

                <DskBankCreditFormCalculationBoxes
                    isLoading={isLoading}
                    selectedPeriodCalculations={selectedPeriodCalculations}
                />

                <DskBankCreditFormPersonalDataFields
                    isLoading={isLoading}
                    errors={errors}
                    setErrors={setErrors}
                    address={address}
                    setAddress={setAddress}
                    personalId={personalId}
                    setPersonalId={setPersonalId}
                    city={city}
                    setCity={setCity}
                    zipCode={zipCode}
                    setZipCode={setZipCode}
                />
            </div>
            <DskBankCreditFormCheckmarks
                checkedOptions={checkedOptions}
                setCheckedOptions={setCheckedOptions}
            />
            <PrimaryButton
                className="w-full mt-6"
                disabled={errors.length > 0 || checkedOptions.size !== 3}
            >
                Изпращане на заявка
            </PrimaryButton>
        </CardContent>
    </Card>
}