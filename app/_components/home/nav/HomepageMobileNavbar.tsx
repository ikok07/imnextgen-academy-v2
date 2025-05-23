"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription, SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/app/_components/ui/shadcn/sheet";
import {IoMenuOutline} from "react-icons/io5";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import HomepageNavLinks from "@/app/_components/home/nav/HomepageNavLinks";
import {useState} from "react";

export default function HomepageMobileNavbar() {

    const [opened, setOpened] = useState(false);

    return <Sheet open={opened}>
        <SheetTrigger onClick={() => setOpened(true)}><IoMenuOutline className="text-3xl"/></SheetTrigger>
        <SheetContent className="flex flex-col justify-between px-0">
            <div className="grid">
                <SheetHeader className="px-5">
                    {/*<Image alt="I&M NextGen Academy" src="/logo.svg" width={150} height={150} />*/}
                    <SheetTitle className="text-left">Навигация</SheetTitle>
                    <SheetDescription className="text-left">Избери някоя от секциите или влез в профила си</SheetDescription>
                </SheetHeader>
                <hr className="w-full h-[1px] bg-border my-3"/>
                <HomepageNavLinks onSelected={() => setOpened(false)} />
            </div>
            <SheetFooter className="flex flex-wrap gap-y-3 px-5">
                <SecondaryButton href={Routes.auth.signIn()} linkClassName="flex-1" className="w-full">Влизане</SecondaryButton>
                <PrimaryButton href={Routes.auth.signUp()} linkClassName="flex-1" className="w-full">Регистрация</PrimaryButton>
            </SheetFooter>
        </SheetContent>
    </Sheet>
}