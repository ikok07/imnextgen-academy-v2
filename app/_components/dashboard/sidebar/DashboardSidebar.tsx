"use client"

import {
    Sidebar,
    SidebarContent, SidebarFooter, SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub,
    SidebarProvider
} from "@/app/_components/ui/shadcn/sidebar";
import Image from "next/image";
import Link from "next/link";
import DashboardSidebarAccountDropdownMenu
    from "@/app/_components/dashboard/sidebar/DashboardSidebarAccountDropdownMenu";
import {checkLinkActive, getNavLinks} from "@/app/_utils/nav/navlinks";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/app/_components/ui/shadcn/collapsible";
import {useState} from "react";
import {IoChevronForward} from "react-icons/io5";

export default function DashboardSidebar() {
    const [openedSubMenus, setOpenedSubMenus] = useState<string[]>([]);

    return <SidebarProvider>
        <Sidebar
            variant="inset"
        >
            <SidebarHeader>
                <div className="grid">
                    <div><Image alt="I&M NextGen Academy" src="/logo.png" width={200} height={60} /></div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarContent>
                    {getNavLinks().map((group, index) => {
                        return <div key={index}>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item, index) => {
                                        if (item.type === "group") {
                                            return <Collapsible className="w-full" onOpenChange={(v) => {
                                                if (v) setOpenedSubMenus(ids => [...ids, item.id])
                                                else setOpenedSubMenus(ids => ids.filter(id => id !== item.id))
                                            }}>
                                                <SidebarMenuItem className="w-full">
                                                    <CollapsibleTrigger className="w-full">
                                                        <SidebarMenuButton className="w-full">
                                                            <div className="flex items-center gap-3">
                                                                {item.Icon && <item.Icon />}
                                                                <span>{item.label}</span>
                                                            </div>
                                                        </SidebarMenuButton>
                                                        <SidebarMenuBadge><IoChevronForward className={`text-lg text-gray-400 ${openedSubMenus.some(id => id === item.id) ? "rotate-90" : ""} transition-all duration-200`}/></SidebarMenuBadge>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent className="w-full">
                                                        {item.items.map((link, index) => {
                                                            return <SidebarMenuSub>
                                                                <SidebarMenuButton asChild={true} className={`${checkLinkActive(link.href, window.location.pathname) ? "bg-main-gradient text-white hover:text-white" : ""}`}>
                                                                    <Link href={link.href} key={index}>
                                                                        <link.Icon />
                                                                        <span>{link.label}</span>
                                                                    </Link>
                                                                </SidebarMenuButton>
                                                            </SidebarMenuSub>
                                                        })}
                                                    </CollapsibleContent>
                                                </SidebarMenuItem>
                                            </Collapsible>
                                        }

                                        return <SidebarMenuButton asChild={true} className={checkLinkActive(item.href, window.location.pathname) ? "bg-main-gradient text-white hover:text-white" : ""}>
                                            <Link href={item.href} key={index}>
                                                <item.Icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </div>
                    })}

                </SidebarContent>
            </SidebarContent>
            <SidebarFooter>
                <DashboardSidebarAccountDropdownMenu />
            </SidebarFooter>
        </Sidebar>
    </SidebarProvider>
}