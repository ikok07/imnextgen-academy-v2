import {usePathname} from "next/navigation";
import {useBreadcrumb} from "@/app/_providers/BreadcrumbProvider";
import {useEffect, useState} from "react";
import * as uuid from "uuid";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbSeparator
} from "@/app/_components/ui/shadcn/breadcrumb";
import Link from "next/link";
import {cn} from "@/app/_utils/cn";
import {useWindowWidth} from "@react-hook/window-size";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import BreadcrumbSkeleton from "@/app/_components/ui/breadcrumb/BreadcrumbSkeleton";
import React from "react";

type CustomBreadcrumbProps = {
    customStaticLabels?: Record<string, string>,
    className?: string
}

export default function CustomBreadcrumb({customStaticLabels, className}: CustomBreadcrumbProps) {
    const pathname = usePathname();
    const {segments, addSegment, isLoaded, setIsLoaded, clearSegments} = useBreadcrumb();
    const [reInitTrigger, setReInitTrigger] = useState<boolean>(false);
    const {viewLoaded} = useViewLoaded();

    const width = useWindowWidth();

    useEffect(() => {
        const routes = pathname.split('/').filter(v => v !== '');

        for (let i = 0; i < routes.length; i++) {
            if (uuid.validate(routes[i])) continue; // skip uuid segments

            if (i + 1 != routes.length && uuid.validate(routes[i + 1])) {
                addSegment({
                    id: routes[i],
                    label: null,
                    href: `/${routes.slice(0, i + 2).join('/')}`
                })
            } else {
                addSegment({
                    id: routes[i],
                    label: customStaticLabels && customStaticLabels[routes[i]] ? customStaticLabels[routes[i]] : routes[i],
                    href: `/${routes.slice(0, i + 1).join('/')}`
                })
            }
        }

        setIsLoaded(true);

        return () => {
            clearSegments();
        }
    }, [reInitTrigger]);

    useEffect(() => {
        if (isLoaded) {
            setIsLoaded(false);
            setReInitTrigger(v => !v);
        }
    }, [pathname]);

    if (!viewLoaded || segments.some(s => s.label == null)) return <BreadcrumbSkeleton />

    if (segments.length <= 1) return;

    return <div className={cn(className)}>
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    if (segments.length - index > (width > 400 ? 2 : 1) && index != 0) return <BreadcrumbEllipsis key={index}/>;
                    return <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild={true}><Link href={segment.href} className="max-w-[10rem] md:max-w-auto block truncate">{segment.label ?? "<uuid-with-no-label>"}</Link></BreadcrumbLink>
                        </BreadcrumbItem>
                        {index + 1 != segments.length && <BreadcrumbSeparator />}
                    </React.Fragment>
                })}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
}