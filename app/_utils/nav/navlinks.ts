import {IconType} from "react-icons";
import {IoCalendar, IoCart, IoDocumentText, IoFilm, IoPeople, IoSchool} from "react-icons/io5";
import {Routes} from "@/app/_utils/nav/routes";

export type NavGroup = {
    id: string,
    label: string,
    items: (NavSubGroup | NavLink)[],
    disallowedRoles?: string[]
}

export type NavSubGroup = {
    type: "group"
    id: string,
    Icon: IconType,
    label: string,
    items: NavLink[],
    disallowedRoles?: string[]
}

export type NavLink = {
    type: "link"
    id: string,
    Icon: IconType,
    label: string,
    href: string,
    disallowedRoles?: string[]
}

export type NavlinkAuthResource = {
    resource: {
        id: string,
        kind: "navlink",
        attr: {
            type: "group" | "subgroup" | "link",
            disallowedRoles: string[]
        },
    }
    actions: ["select"]
}

export function getNavLinks(): NavGroup[] {
    return [
        {
            id: "academy",
            label: "Академия",
            items: [
                {
                    type: "link",
                    id: "classroom",
                    Icon: IoSchool,
                    label: "Класна стая",
                    href: Routes.dashboard.classroom.base
                },
                {
                    type: "link",
                    id: "events",
                    Icon: IoCalendar,
                    label: "Календар",
                    href: Routes.dashboard.events.base()
                },
                {
                    type: "link",
                    id: "shop",
                    Icon: IoCart,
                    label: "Магазин",
                    href: Routes.dashboard.shop.base()
                }
            ]
        },
        {
            id: "administration",
            label: "Администрация",
            disallowedRoles: ["user"],
            items: [
                {
                    type: "group",
                    id: "users",
                    Icon: IoPeople,
                    label: "Потребители",
                    items: [
                        {
                            type: "link",
                            id: "allUsers",
                            Icon: IoDocumentText,
                            label: "Всички",
                            href: "/dashboard/admin/users",
                        }
                    ]
                },
                {
                    type: "link",
                    id: "media",
                    Icon: IoFilm,
                    label: "Медия",
                    href: Routes.dashboard.admin.media()
                }
            ]
        }
    ]
}

export function checkLinkActive(link: string, url: string) {
    const segments = url.split('/');
    return segments.some(segment => segment === link.replaceAll('/', ''));
}

export function getNavlinkAuthResources(): NavlinkAuthResource[] {
    const authResources = getNavLinks().flatMap(group => {
        const itemsResources = group.items.flatMap(item => {
            let navlinkResource: NavlinkAuthResource = {
                resource: {
                    id: item.id,
                    kind: "navlink",
                    attr: {
                        type: "link",
                        disallowedRoles: []
                    },
                },
                actions: ["select"]
            }
            if (item.type === "link") {
                navlinkResource.resource.attr.disallowedRoles = item.disallowedRoles ?? [];
            } else {
                navlinkResource.resource.attr.type = "subgroup";
                navlinkResource.resource.attr.disallowedRoles = [...item.disallowedRoles ?? []];
            }

            return item.type === "group" ? [navlinkResource, ...item.items.map(item => ({
                resource: {
                    id: item.id,
                    kind: "navlink",
                    attr: {
                        type: "link",
                        disallowedRoles: item.disallowedRoles ?? []
                    },
                },
                actions: ["select"]
            }) as NavlinkAuthResource)] : navlinkResource;
        });

        return [
            ...itemsResources,
            {
                resource: {
                    id: group.id,
                    kind: "navlink",
                    attr: {
                        type: "group",
                        disallowedRoles: group.disallowedRoles ?? []
                    },
                },
                actions: ["select"]
            } as NavlinkAuthResource
        ]
    });

    return authResources;
}