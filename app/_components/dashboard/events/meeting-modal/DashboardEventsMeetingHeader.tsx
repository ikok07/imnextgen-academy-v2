"use client"

import Image from "next/image";
import {CopyToClipboard} from "react-copy-to-clipboard";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {LucideClipboard, LucideClipboardCheck} from "lucide-react";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useCallback, useMemo, useState} from "react";
import {FullMeeting} from "@/drizzle/schema/meetings";
import {IoStar} from "react-icons/io5";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {addSignedUpUser, checkUserSignedUpForMeeting, removeSignedUpUser} from "@/app/dashboard/events/actions";
import {FullMeetingStartTime} from "@/src/entities/utils/meetings/get-full-meeting-start-time.util";
import {toast} from "sonner";
import {SerializableUser} from "@/src/entities/models/auth/serializable-user";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {useQueryClient} from "react-query";

type DashboardEventsMeetingHeaderProps = {
    fullMeeting: FullMeeting,
    user: SerializableUser,
    startDate: FullMeetingStartTime | undefined
}

export default function DashboardEventsMeetingHeader({fullMeeting, user, startDate}: DashboardEventsMeetingHeaderProps) {
    const [resetTimeout, setResetTimeout] = useState<NodeJS.Timeout | null>(null);
    const [linkCopied, setLinkCopied] = useState(false);
    const queryClient = useQueryClient();
    const userSignedUpQueryKey = useMemo(() => `signed-up-user-${startDate!.hours}-${startDate!.minutes}-${fullMeeting.id}`, [fullMeeting.id, startDate?.hours, startDate?.minutes]);

    const {data: userSignedUpQuery, isLoading: isCheckingUserSignedUp, isFetching: isReFetchingUserSignedUp} = useErrorQuery({
        queryFn: () => checkUserSignedUpForMeeting(user.emailAddress, fullMeeting.id, startDate!.timestamp),
        queryKey: [userSignedUpQueryKey],
        enabled: !!startDate,
        onError() {
            toast.error("Не можахме да извлечем статуса за присъствието ти в тази среща!");
        }
    });

    const {mutate: addSignedUpUserMethod, isLoading: isAddingSignedUpUser} = useErrorMutation({
        mutationFn: () => addSignedUpUser({
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddress,
            phone: user.phoneNumber,
            meeting_id: fullMeeting.id,
            meeting_start_date: startDate?.timestamp ? Math.round(startDate.timestamp / 1000) : undefined
        }),
        onSuccess() {queryClient.invalidateQueries([userSignedUpQueryKey])},
        onError() {
            toast.error("Не можахме да променим статуса за присъствието ти в тази среща!");
        }
    });

    const {mutate: removeSignedUpUserMethod, isLoading: isRemovingSignedUpUser} = useErrorMutation({
        mutationFn: () => removeSignedUpUser({
            email: user.emailAddress,
            meeting_id: fullMeeting.id,
            start_date: startDate?.timestamp ? Math.round(startDate.timestamp / 1000) : undefined
        }),
        onSuccess() {queryClient.invalidateQueries([userSignedUpQueryKey])},
        onError() {
            toast.error("Не можахме да променим статуса за присъствието ти в тази среща!");
        }
    });

    function setCopiedLink() {
        if (!resetTimeout) {
            setResetTimeout(setTimeout(() => {
                setLinkCopied(false);
                setResetTimeout(null);
            }, 9000))
        }
        setLinkCopied(true);
    }

    const signUpForEventButton = useCallback(() => {
        const btnClasses = "w-full flex-1";

        if (isCheckingUserSignedUp || isAddingSignedUpUser || isRemovingSignedUpUser || isReFetchingUserSignedUp) return <SecondaryButton
            loading={true}
            className={btnClasses}
        >
            Зареждане
        </SecondaryButton>

        const userSignedUp = userSignedUpQuery?.success ? userSignedUpQuery.value : false;
        const content = userSignedUp ? "Отписване" : "Ще присъствам";

        if (!userSignedUp) return <PrimaryButton
            className={btnClasses}
            onClick={() => addSignedUpUserMethod()}
        >
            {content}
        </PrimaryButton>

        return <SecondaryButton
            className={btnClasses}
            onClick={() => removeSignedUpUserMethod()}
        >
            {content}
        </SecondaryButton>
    }, [isCheckingUserSignedUp, userSignedUpQuery, isAddingSignedUpUser, isRemovingSignedUpUser, isReFetchingUserSignedUp]);

    return <div className="grid md:grid-cols-[1fr_1.5fr] gap-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
            <img alt={fullMeeting.title} src={fullMeeting.image_url} className="absolute inset-0" />
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
            <div className="flex items-center gap-3 flex-wrap mt-5">
                {signUpForEventButton()}
                <CopyToClipboard text={fullMeeting.url} onCopy={setCopiedLink}>
                    {linkCopied ?
                        <SecondaryButton className="h-full">
                            <LucideClipboardCheck />
                        </SecondaryButton>
                        :
                        <PrimaryButton className="h-full">
                            <LucideClipboard />
                        </PrimaryButton>
                    }
                </CopyToClipboard>
            </div>
        </div>
    </div>
}