import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";
import {ReactNode} from "react";
import {ShopProvider} from "@/app/_providers/ShopProvider";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return <SetActiveLinkComponent linkId="shop">
        <ShopProvider>
            {children}
        </ShopProvider>
    </SetActiveLinkComponent>
}