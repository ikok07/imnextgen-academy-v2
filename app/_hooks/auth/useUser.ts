"use client"

import {useAuth, useUser} from "@clerk/nextjs";

export function useAppUser() {
    const authData = useAuth();
    const userObject = useUser();

    return {
        authData,
        userObject
    }
}