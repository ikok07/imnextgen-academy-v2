import {ReactNode} from "react";
import {checkAccess} from "@/app/actions";
import {getUser} from "@/app/_utils/actions/auth";
import {redirect} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";
import {getNavLinks} from "@/app/_utils/nav/navlinks";

type LayoutProps = {
    children: ReactNode
}

export default async function Layout({children}: LayoutProps) {
    const userResponse = await getUser();

    if (!userResponse.success || !userResponse.value.user) throw new Error("Unable to get user!");

    const accessResult = await checkAccess({
        principal: {
            id: userResponse.value.user.id,
            roles: userResponse.value.user.publicMetadata["roles"] as string[]
        },
        resource: {
            id: "administration",
            kind: "navlink",
            attr: {
                type: "link",
                disallowedRoles: getNavLinks().find(item => item.id === "administration")?.disallowedRoles ?? ["user"]
            }
        },
        action: "select"
    });

    if (!accessResult.success) throw new Error("Unable to get access result!");

    if (!accessResult.value) return redirect(Routes.dashboard.base);

    return <div>
        {children}
    </div>
}