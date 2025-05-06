"use client"

import {IoWarning} from "react-icons/io5";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useAppDispatch} from "@/app/_hooks/redux";
import {setSettingsOpened} from "@/app/_store/slices/settings";

export default function DashboardEmailConfirmMessage() {
    const dispatch = useAppDispatch();

    return <div className="absolute w-[97%] md:w-[90%] left-1/2 top-0 -translate-x-1/2">
        <div className="px-3 py-2 flex md:items-center flex-col md:flex-row gap-4 mx-auto mt-3 rounded-lg shadow-2xl border border-border bg-secondary-gradient animate-in slide-in-from-top-1/2 zoom-in-[104%] fade-in ease-out duration-500 transform-gpu">
            <div className="flex md:items-center flex-col md:flex-row gap-1 md:gap-2 flex-1">
                <IoWarning className="text-4xl text-orange-500" />
                <h3 className="font-semibold text-primary text-[0.8rem] md:text-[0.9rem]">Имейлът ти все още не е потвърден! Побързай, за да не изгубиш достъп до академията.</h3>
            </div>
            <PrimaryButton type="button" onClick={() => dispatch(setSettingsOpened(true))}>Потвърждаване</PrimaryButton>
        </div>
    </div>
}