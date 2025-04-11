"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import {secondaryControlBackground} from "@/app/_components/ui/backgrounds/secondaryControlBackground";
import Image from "next/image";
import {IoAlertCircle, IoChevronUp, IoExit, IoMoon, IoSettings} from "react-icons/io5";
import {useClerk, useUser} from "@clerk/nextjs";
import DropdownMenuItemRow from "@/app/_components/ui/dropdown/DropdownMenuItemRow";
import {useState} from "react";
import {useTheme} from "next-themes";
import PrimarySwitch from "@/app/_components/ui/toggles/PrimarySwitch";
import {useAppUser} from "@/app/_hooks/auth/useUser";

export default function DashboardSidebarAccountDropdownMenu() {
    const clerk = useClerk();
    const {theme, setTheme} = useTheme();
    const {userObject, emailConfirmed} = useAppUser();

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);

    function handleSignOut() {
        setIsSigningOut(true);
        clerk.signOut();
    }

    if (!userObject.user) return;

    return <DropdownMenu onOpenChange={(v) => setMenuOpened(v)}>
        <DropdownMenuTrigger className="flex items-center" asChild>
            <div
                className={secondaryControlBackground("cursor-pointer py-1 justify-between")}
            >
                <div className="flex items-center gap-1 justify-between">
                    <div className="flex items-center gap-3">
                        <Image alt={userObject.user.firstName ?? "user"} src={userObject.user.imageUrl} width={25} height={25} className="rounded-full"/>
                        <span className="text-sm font-bold">{userObject.user.firstName} {userObject.user.lastName}</span>
                    </div>
                    {!emailConfirmed && <IoAlertCircle className="text-red-500"/>}
                </div>
                <IoChevronUp className={`${menuOpened ? "rotate-180" : ""} transition-all duration-200`}/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dropdown-content-width-full">
            <DropdownMenuGroup>
                <DropdownMenuItemRow
                    type="button"
                    Icon={IoExit}
                    label="Излизане"
                    onClick={handleSignOut}
                    iconClassName="text-red-400 group-hover:text-red-500 dark:group-hover:text-red-500"
                    isLoading={isSigningOut}
                />
                <DropdownMenuItemRow
                    type="button"
                    Icon={IoSettings}
                    label="Настройки"
                    additionalContent={!emailConfirmed && <IoAlertCircle className="text-red-500 text-lg"/>}
                    onClick={() => clerk.openUserProfile()}
                />
                <DropdownMenuItemRow
                    Icon={IoMoon}
                    label="Тъмен режим"
                    type="button"
                    additionalContent={<PrimarySwitch checked={theme === "dark"} />}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}