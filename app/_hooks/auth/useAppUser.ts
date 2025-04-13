"use client"

import {useAuth, useUser} from "@clerk/nextjs";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getDbProfile} from "@/app/actions";

export function useAppUser() {
    const authData = useAuth();
    const userObject = useUser();

    const {data: dbProfile, isLoading: isLoadingDbProfile} = useErrorQuery({
        queryFn: () => getDbProfile(userObject.user?.id),
        queryKey: ["dbProfile"],
        staleTime: 60_000,
        enabled: !!userObject.user?.id
    })

    return {
        authData,
        userObject,
        dbProfile: dbProfile?.success ? dbProfile.value : null,
        isLoadingDbProfile,
        emailConfirmed: userObject.user?.emailAddresses[0]?.verification?.status === "verified"
    }
}