"use client"

import {VideoResource} from "@/drizzle/schema/video_resources";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {IoDocumentAttachOutline} from "react-icons/io5";
import {DropdownMenuLabel} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

type DashboardModuleVideoResourcesProps = {
    resources: VideoResource[]
}

export default function DashboardModuleVideoResources({resources}: DashboardModuleVideoResourcesProps) {
    if (resources.length === 0) return;

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <SecondaryButton>
                <IoDocumentAttachOutline />
                Ресурси
            </SecondaryButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                {resources.map((resource, index) => {
                    return <Link target="_blank" href={resource.url}><DropdownMenuItem key={index} className="cursor-pointer">{resource.label}</DropdownMenuItem></Link>
                })}
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
}