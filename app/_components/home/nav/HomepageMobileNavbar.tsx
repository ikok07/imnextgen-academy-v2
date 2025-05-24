"use client"

import {useEffect, useState} from "react";
import {IoClose, IoMenuOutline} from "react-icons/io5";
import Image from "next/image";
import HomepageNavLinks from "@/app/_components/home/nav/HomepageNavLinks";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {cn} from "@/app/_utils/cn";

export default function HomepageMobileNavbar() {
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if (opened) document.documentElement.style.overflow = "hidden";
        else document.documentElement.style.overflow = "auto";

        return () => {
            document.documentElement.style.overflowY = "auto";
        }
    }, [opened]);

    return <div>
        <button onClick={() => setOpened(true)}><IoMenuOutline className="text-4xl" /></button>

        {opened && <div className="fixed inset-0 bg-transparent z-20" onClick={() => setOpened(false)} />}

        <div
            style={{transform: `translateX(${opened ? 0 : 100}%)`}}
            className={cn(
                "fixed top-0 right-0 w-[75vw] max-w-[20rem] h-full grid grid-rows-[auto_auto_1fr] bg-background shadow-2xl rounded-lg py-3 z-20",
                "transition-all duration-300 ease-in-out"
            )}
        >
            <div className="grid grid-cols-[1fr_auto] px-3">
                <Image alt="I&M NextGen Academy" src="/logo.svg" width={170} height={100} />
                <button onClick={() => setOpened(false)}><IoClose className="text-2xl text-primary/70" /></button>
            </div>
            <hr className="w-full h-[1px] bg-border my-3"/>
            <div className="px-3 flex flex-col justify-between">
                <HomepageNavLinks onSelect={() => setOpened(false)} />
                <div className="grid gap-2">
                    <SecondaryButton href={Routes.auth.signIn()} className="w-full">Влизане</SecondaryButton>
                    <PrimaryButton href={Routes.auth.signUp()} className="w-full">Регистрация</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}