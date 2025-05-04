"use client"

import {UserProfile} from "@clerk/nextjs";
import {IoCard, IoCloseCircle} from "react-icons/io5";
import {useAppDispatch, useAppSelector} from "@/app/_hooks/redux";
import {setSettingsOpened} from "@/app/_store/slices/settings";
import {useRouter} from "next/navigation";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import SettingsModalSkeleton from "@/app/_components/dashboard/settings/SettingsModalSkeleton";
import {useEffect} from "react";

export default function SettingsModal() {
    const router = useRouter();
    const {settingsOpened} = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    function handleClose() {
        router.replace(window.location.pathname); // remove the hash from the url
        dispatch(setSettingsOpened(false));
    }

    useEffect(() => {
        document.documentElement.style.overflowY = settingsOpened ? "hidden" : "auto";
        return () => {
            document.documentElement.style.overflowY = "auto";
        }
    }, [settingsOpened]);

    return <div
        className={`absolute ${settingsOpened ? "visible opacity-100" : "opacity-0 invisible"} w-full min-h-full settings-modal bg-black bg-opacity-80 z-20 grid transition-[opacity,visibility] duration-200`}
        onClick={e => {
            if (e.target === e.currentTarget) {
                handleClose();
            }
        }}
    >
        <div
            className="relative flex flex-col items-end justify-center w-[95%] md:w-auto py-5 self-center mx-auto"
            onClick={e => {
                if (e.target === e.currentTarget) {
                    handleClose();
                }
            }}
        >
            <PrimaryButton
                onClick={handleClose}
                className="rounded-full mb-3 bg-red-gradient text-[0.75rem] md:text-sm"
            >
                <IoCloseCircle />
                Затваряне
            </PrimaryButton>

            <UserProfile
                routing="hash"
                fallback={<SettingsModalSkeleton />}
            >
                <UserProfile.Link
                    labelIcon={<IoCard />}
                    label="Плащания"
                    url={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}
                />
            </UserProfile>
        </div>
    </div>
}