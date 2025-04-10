import {IconType} from "react-icons";
import {IoCalendar, IoDocumentLock, IoDocumentText, IoPeople, IoSchool} from "react-icons/io5";

export type NavGroup = {
    id: string,
    label: string,
    items: NavSubGroup[] | Navlink[],
    disallowedRoles?: string[]
}

export type NavSubGroup = {
    type: "group"
    id: string,
    Icon: IconType,
    label: string,
    items: Navlink[],
    disallowedRoles?: string[]
}

export type Navlink = {
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
                    href: "/dashboard"
                },
                {
                    type: "link",
                    id: "calendar",
                    Icon: IoCalendar,
                    label: "Календар",
                    href: "/dashboard/calendar"
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
                    disallowedRoles: ["subgroup"],
                    items: [
                        {
                            type: "link",
                            id: "allUsers",
                            Icon: IoDocumentText,
                            label: "Всички потребители",
                            href: "/dashboard/admin/users",
                            disallowedRoles: ["link"],
                        }
                    ]
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