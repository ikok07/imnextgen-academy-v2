"use client"

import Image from "next/image";
import {CopyToClipboard} from "react-copy-to-clipboard";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {LucideClipboard, LucideClipboardCheck} from "lucide-react";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useMemo, useState} from "react";
import {useTheme} from "next-themes";
import {getMeetingPlatformIcon} from "@/app/_utils/meetings/getMeetingPlatformIcon";
import {FullMeeting} from "@/drizzle/schema/meetings";
import {IoStar} from "react-icons/io5";

type DashboardEventsMeetingHeaderProps = {
    fullMeeting: FullMeeting
}

export default function DashboardEventsMeetingHeader({fullMeeting}: DashboardEventsMeetingHeaderProps) {

    const [resetTimeout, setResetTimeout] = useState<NodeJS.Timeout | null>(null);
    const [linkCopied, setLinkCopied] = useState(false);
    const {resolvedTheme} = useTheme();

    const platformIcon = useMemo(() => getMeetingPlatformIcon(fullMeeting.platform), []);

    function setCopiedLink() {
        if (!resetTimeout) {
            setResetTimeout(setTimeout(() => {
                setLinkCopied(false);
                setResetTimeout(null);
            }, 9000))
        }
        setLinkCopied(true);
    }

    return <div className="grid md:grid-cols-[1fr_1.5fr] gap-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
            <Image alt={fullMeeting.title} src={fullMeeting.image_url} fill />
        </div>
        <div className="flex flex-col justify-between">
            <div>
                {fullMeeting.access === "premium" && <div className="flex items-center gap-1 w-max bg-main-gradient text-white px-2 py-1 rounded-full mb-1">
                    <IoStar />
                    <span className="text-[0.65rem] uppercase font-bold">Премиум</span>
                </div>}
                <h1 className="text-lg font-bold leading-[1.3]">{fullMeeting.title}</h1>
                <p className="text-primary/70 text-sm">{fullMeeting.description}</p>
            </div>
            <div className="flex items-center gap-3 mt-5">
                <CopyToClipboard text={fullMeeting.url} onCopy={setCopiedLink}>
                    {linkCopied ?
                        <SecondaryButton>
                            <LucideClipboardCheck />
                            Линкът е копиран
                        </SecondaryButton>
                        :
                        <PrimaryButton>
                            <LucideClipboard />
                            Копиране на линк
                        </PrimaryButton>
                    }
                </CopyToClipboard>
                <Image
                    alt={fullMeeting.platform}
                    src={resolvedTheme === "dark" ? platformIcon.pathDark : platformIcon.path}
                    width={30}
                    height={10}
                />
            </div>
        </div>
    </div>
}