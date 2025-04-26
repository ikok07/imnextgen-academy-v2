import {ReactNode} from "react";

type DashboardPageTitleProps = {
    children: ReactNode
}

export default function DashboardPageTitle({children}: DashboardPageTitleProps) {
    return <h1
        className="text-xl font-semibold border-b border-secondary pb-3 md:pt-3 mb-6"
    >
        {children}
    </h1>
}
