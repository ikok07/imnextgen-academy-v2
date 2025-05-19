"use client"

import {useTheme} from "next-themes";
import Image from "next/image";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import {ReactNode} from "react";

type ErrorPageComponentProps = {
    heading: string | ReactNode,
    subheading: string | ReactNode,
    description: string | ReactNode
}

export default function ErrorPageComponent({heading, subheading, description}: ErrorPageComponentProps) {
    const {resolvedTheme} = useTheme();

    return <div className="flex flex-col items-center mt-5">
        <Image alt="I&M NextGen Academy" src={resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo.svg"} width={200} height={100} />
        <div className="w-[95%] max-w-[60rem] m-auto grid md:grid-cols-2 items-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-black">{heading}</h1>
                <h4 className="text-2xl font-semibold my-3">{subheading}</h4>
                <p className="text-primary/70">{description}</p>
                <PrimaryButton className="mt-3" href={Routes.home}>Начална страница</PrimaryButton>
            </div>
            <div className="relative w-[20rem] max-w-[95%] aspect-square justify-self-center row-start-1 md:row-auto"><Image alt="Възникна грешка" src="/error.svg" fill /></div>
        </div>
    </div>
}