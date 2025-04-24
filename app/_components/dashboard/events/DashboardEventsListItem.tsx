"use client"

import Image from "next/image";
import {Card} from "@/app/_components/ui/shadcn/card";
import {IoTime} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";

export default function DashboardEventsListItem() {
    return <Card className="flex gap-3 h-[8rem]">
        <div className="relative w-[30%] h-full rounded-l-xl overflow-hidden">
            <Image
                alt="test image"
                src={"https://ozwkuahulnwluilmnjjr.supabase.co/storage/v1/object/public/Application%20Images/modules/first-row-1.png"}
                className="object-cover"
                fill
            />
        </div>
        <div className="p-2">
            <h2 className="font-bold">Заглавие на събитие</h2>
            <p className="text-sm text-primary/70">Не чак толкова дълго описание на събитие</p>
            <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <IoTime className="text-cta text-lg"/>
                    <span className="text-cta font-bold">15:00</span>
                </div>
                <SecondaryButton className="text-[0.8rem]">Повече информация</SecondaryButton>
            </div>
        </div>
    </Card>
}