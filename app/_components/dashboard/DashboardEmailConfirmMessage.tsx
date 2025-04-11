"use client"

import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {IoWarning} from "react-icons/io5";
import {useClerk} from "@clerk/nextjs";

export default function DashboardEmailConfirmMessage() {
    const {openUserProfile} = useClerk();

    return <div className="absolute w-[97%] md:w-[90%] left-1/2 top-0 -translate-x-1/2">
        <div className="px-3 py-2 flex md:items-center flex-col md:flex-row gap-4 mx-auto mt-3 rounded-lg shadow-2xl border border-border bg-secondary-gradient animate-in slide-in-from-top-1/2 zoom-in-[104%] fade-in ease-out duration-500 transform-gpu">
            <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-2 flex-1">
                <IoWarning className="text-4xl text-orange-500" />
                <h3 className="font-semibold text-gray-900 text-[0.8rem] md:text-[0.9rem]">Имейлът ти все още не е потвърден! Побързай, за да не изгубиш достъп до академията.</h3>
            </div>
            <SecondaryButton type="button" onClick={() => openUserProfile()}>Потвърждаване</SecondaryButton>
        </div>
    </div>
}