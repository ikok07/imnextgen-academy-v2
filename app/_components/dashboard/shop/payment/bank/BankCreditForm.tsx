"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import BankCreditFormPropertyBox from "@/app/_components/dashboard/shop/payment/bank/BankCreditFormPropertyBox";
import {IoCalendar, IoCash} from "react-icons/io5";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useEffect, useState} from "react";

export default function BankCreditForm() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    return <Card className="h-max">
        <CardHeader className="space-y-0.5">
            <Image alt="DSK Bank" src="/banks/dsk-logo.png" width={150} height={100} className="mb-3"/>
            <CardTitle className="text-xl">Разсрочено плащане</CardTitle>
            <CardDescription className="text-[1rem]">Възползвай се от възможността за плащане на подходящи месечни вноски</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                <PrimaryInput label="Първоначална вноска (лв)" placeholder="200"/>
                <div className="grid grid-cols-2 gap-3">
                    <BankCreditFormPropertyBox
                        Icon={IoCalendar}
                        label="Месечна вноска"
                        isLoading={isLoading}
                        value="120 лв."
                    />
                    <BankCreditFormPropertyBox
                        Icon={IoCash}
                        label="Размер на кредит"
                        isLoading={isLoading}
                        value="2600 лв."
                    />
                </div>

                <PrimaryInput label="Адрес" placeholder="Улица" />
                <PrimaryInput label="ЕГН" placeholder="ХХХ..." />
                <div className="grid grid-cols-2 gap-3">
                    <PrimaryInput label="Населено място" placeholder="Град / Село" />
                    <PrimaryInput label="Пощенски код" placeholder="ХХХХ" />
                </div>
            </div>
            <PrimaryButton
                className="w-full mt-6"
                disabled={true}
            >
                Изпращане на заявка
            </PrimaryButton>
        </CardContent>
    </Card>
}