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
                    items: [
                        {
                            type: "link",
                            id: "allUsers",
                            Icon: IoDocumentText,
                            label: "Всички потребители",
                            href: "/dashboard/admin/users"
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