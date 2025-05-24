"use client"

import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {useAppUser} from "@/app/_hooks/auth/useAppUser";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function HomepageNavbarButtons() {
    const {authData, isLoading} = useAppUser(true);

    if (isLoading) {
        return <>
            <Skeleton className="w-full lg:w-[6rem] h-[2rem]" />
            <Skeleton className="w-full lg:w-[7rem] h-[2rem]" />
        </>
    }

    return !!authData.userId ?
            <PrimaryButton href={Routes.dashboard.classroom.base} className="w-full">Главен панел</PrimaryButton>
            :
            <>
                <SecondaryButton href={Routes.auth.signIn()} className="w-full">Влизане</SecondaryButton>
                <PrimaryButton href={Routes.auth.signUp()} className="w-full">Регистрация</PrimaryButton>
            </>
}