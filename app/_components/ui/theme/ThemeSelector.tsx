"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {useTheme} from "next-themes";
import {LuMoon, LuSun} from "react-icons/lu";
import {useTranslations} from "use-intl";
import {useEffect, useState} from "react";
import ClientMountedComponent from "@/app/_components/ui/ClientMountedComponent";

export default function ThemeSelector() {
    const {setTheme} = useTheme();
    const t = useTranslations("Config.Themes");

    return <ClientMountedComponent>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <SecondaryButton>
                    <LuSun className="dark:hidden"/>
                    <LuMoon className="hidden dark:block"/>
                </SecondaryButton>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        {t("system")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        {t("light")}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        {t("dark")}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenuTrigger>
        </DropdownMenu>
    </ClientMountedComponent>
}