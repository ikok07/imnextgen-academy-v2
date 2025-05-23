"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/app/_components/ui/shadcn/navigation-menu";
import {HOME_NAV_ITEMS} from "@/app/_utils/home/nav/homepage-navbar-items";
import {cn} from "@/app/_utils/cn";
import {useRouter} from "next/navigation";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import {useWindowWidth} from "@react-hook/window-size";

type HomepageNavLinksProps = {
    onSelected?: () => void
}

export default function HomepageNavLinks({onSelected}: HomepageNavLinksProps) {
    const {viewLoaded} = useViewLoaded();
    const width = useWindowWidth();
    const router = useRouter();

    function closeMenusAndScroll(currHash?: string) {
        if (!currHash) return;
        if (onSelected) onSelected();
        // Add delay because the sheet component sets the scroll position to 0 after closing
        setTimeout(() => {
            router.push(currHash);
        }, width > 1020 ? 0 : 350);
    }

    if (!viewLoaded) return;

    return <NavigationMenu className="homepage-mobile-navbar-inner-container test w-full max-w-full">
        <NavigationMenuList className="flex-col lg:flex-row w-full">
            {HOME_NAV_ITEMS.map((item, index) => {
                return <NavigationMenuItem key={index} className="w-full">
                    <button
                        className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent font-normal text-[1rem] w-full"
                        )}
                        onClick={() => closeMenusAndScroll(item.href)}
                    >
                        {item.label}
                    </button>
                </NavigationMenuItem>
            })}
        </NavigationMenuList>
    </NavigationMenu>
}