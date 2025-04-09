"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import {secondaryControlBackground} from "@/app/_components/ui/backgrounds/secondaryControlBackground";
import Image from "next/image";
import {IoChevronUp, IoExit, IoSettings} from "react-icons/io5";
import {useClerk, useUser} from "@clerk/nextjs";
import DropdownMenuItemRow from "@/app/_components/ui/dropdown/DropdownMenuItemRow";
import {useState} from "react";

export default function DashboardSidebarAccountDropdownMenu() {
    const clerk = useClerk();
    const {user} = useUser();

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);

    function handleSignOut() {
        setIsSigningOut(true);
        clerk.signOut();
    }

    if (!user) return;

    return <DropdownMenu onOpenChange={(v) => setMenuOpened(v)}>
        <DropdownMenuTrigger className="flex items-center" asChild>
            <div
                className={secondaryControlBackground("cursor-pointer py-1 justify-between")}
            >
                <div className="flex items-center gap-3">
                    <Image alt={user.firstName ?? "user"} src={user.imageUrl} width={25} height={25} className="rounded-full"/>
                    <span className="text-sm font-bold">{user.firstName} {user.lastName}</span>
                </div>
                <IoChevronUp className={`${menuOpened ? "rotate-180" : ""} transition-all duration-200`}/>
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="dropdown-content-width-full">
            <DropdownMenuGroup>
                <DropdownMenuItemRow type="button" Icon={IoExit} label="Излизане" onClick={handleSignOut} iconClassName="text-red-400 group-hover:text-red-500" isLoading={isSigningOut}/>
                <DropdownMenuItemRow type="button" Icon={IoSettings} label="Настройки" onClick={() => clerk.openUserProfile()} />
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}