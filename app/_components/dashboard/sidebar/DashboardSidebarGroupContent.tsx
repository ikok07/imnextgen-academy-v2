import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/app/_components/ui/shadcn/collapsible";
import {
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSkeleton,
    SidebarMenuSub
} from "@/app/_components/ui/shadcn/sidebar";
import {IoChevronForward} from "react-icons/io5";
import {checkLinkActive, NavGroup} from "@/app/_utils/nav/navlinks";
import Link from "next/link";
import {useState} from "react";
import {DecisionResults} from "@/src/application/services/auth/authorization.service.interface";

type DashboardSidebarNavLinkContentProps = {
    group: NavGroup,
    results: DecisionResults,
    isLoading: boolean
}

export default function DashboardSidebarGroupContent({group, results, isLoading}: DashboardSidebarNavLinkContentProps) {
    const [openedSubMenus, setOpenedSubMenus] = useState<string[]>([]);

    return <>
        {group.items.map((item, index) => {
            if (results.some(res => res.resourceId === item.id && res.actions["select"] === "EFFECT_ALLOW")) {
                if (item.type === "group") {
                    return <Collapsible className="w-full" onOpenChange={(v) => {
                        if (v) setOpenedSubMenus(ids => [...ids, item.id])
                        else setOpenedSubMenus(ids => ids.filter(id => id !== item.id))
                    }}>
                        <SidebarMenuItem className="w-full">
                            <CollapsibleTrigger className="w-full">
                                {isLoading ?
                                    <SidebarMenuSkeleton showIcon={true}/>
                                    :
                                    <SidebarMenuButton className="w-full">
                                        <div className="flex items-center gap-3">
                                            {item.Icon && <item.Icon />}
                                            <span>{item.label}</span>
                                        </div>
                                        <SidebarMenuBadge><IoChevronForward className={`text-lg text-gray-400 ${openedSubMenus.some(id => id === item.id) ? "rotate-90" : ""} transition-all duration-200`}/></SidebarMenuBadge>
                                    </SidebarMenuButton>
                                }
                            </CollapsibleTrigger>
                            <CollapsibleContent className="w-full">
                                {item.items.map((link, index) => {
                                   if (results.some(res => res.resourceId === link.id && res.actions["select"] === "EFFECT_ALLOW")) {
                                       return <SidebarMenuSub>
                                           {isLoading ?
                                               <SidebarMenuSkeleton showIcon={true}/>
                                               :
                                               <SidebarMenuButton asChild={true} className={`${checkLinkActive(link.href, window.location.pathname) ? "bg-main-gradient text-white hover:text-white" : ""}`}>
                                                   <Link href={link.href} key={index}>
                                                       <link.Icon />
                                                       <span>{link.label}</span>
                                                   </Link>
                                               </SidebarMenuButton>
                                           }
                                       </SidebarMenuSub>
                                   }
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
            } else if (isLoading) return <SidebarMenuSkeleton showIcon={true} />
        })}
    </>
}