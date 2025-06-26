import {ReactNode} from "react";
import {checkAccess, checkMultipleResourcesAccess, getUser} from "@/app/actions";
import RedirectComponent from "@/app/_components/ui/RedirectComponent";
import {Routes} from "@/app/_utils/nav/routes";

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({children}: LayoutProps) {
    const userResult = await getUser();

    if (!userResult.success || !userResult.value.user || !userResult.value.dbProfile) throw new Error("User could not be fetched!");

    const accessResult = await checkMultipleResourcesAccess({
        principal: {
            id: userResult.value.user.id ?? "",
            roles: userResult.value.dbProfile.roles
        },
        resources: [{
            resource: {
                id: "module",
                kind: "module"
            },
            actions: ["select", "insert", "update", "delete"]
        }]
    });

    if (!accessResult.success || accessResult.value.length === 0) throw new Error("Could not determine if the user has access to this functionality!");

    const hasAccess = !Object.values(accessResult.value[0].actions).some(val => val !== "EFFECT_ALLOW");

    if (!hasAccess) return <RedirectComponent path={Routes.dashboard.classroom.base} />

    return children;
}