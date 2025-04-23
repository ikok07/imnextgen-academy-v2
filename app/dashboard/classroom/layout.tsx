import {ReactNode} from "react";
import SetActiveLinkComponent from "@/app/_components/dashboard/nav/SetActiveLinkComponent";

type LayoutProps = {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return <SetActiveLinkComponent linkId="classroom">
        {children}
    </SetActiveLinkComponent>
}