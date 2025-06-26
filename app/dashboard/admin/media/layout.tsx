import {ReactNode} from "react";
import {checkAccess, checkMultipleResourcesAccess, getUser} from "@/app/actions";

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
    console.log(userResult.value.dbProfile.roles, accessResult.value[0].actions)
    const hasAccess = !Object.values(accessResult.value[0].actions).some(val => val !== "EFFECT_ALLOW");
    console.log(hasAccess)
    return children;
}