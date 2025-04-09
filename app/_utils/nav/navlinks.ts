import {IconType} from "react-icons";
import {IoCalendar, IoDocumentLock, IoDocumentText, IoPeople, IoSchool} from "react-icons/io5";

export type NavGroup = {
    id: string,
    label: string,
    items: NavSubGroup[] | Navlink[]
}

export type NavSubGroup = {
    type: "group"
    id: string,
    Icon: IconType,
    label: string,
    items: Navlink[]
}

export type Navlink = {
    type: "link"
    id: string,
    Icon: IconType,
    label: string,
    href: string
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
            id: "adminPanel",
            label: "Администрация",
            items: [
                {
                    type: "group",
                    id: "admin1",
                    Icon: IoPeople,
                    label: "Потребители",
                    items: [
                        {
                            type: "link",
                            id: "adminProfiles",
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