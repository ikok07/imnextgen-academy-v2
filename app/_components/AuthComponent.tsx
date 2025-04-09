"use client"

import {useAppUser} from "@/app/_hooks/auth/useUser";
import {UserButton} from "@clerk/nextjs";
import {useAccess} from "@/app/_hooks/auth/useAccess";
import {IoGlobeOutline, IoLinkOutline} from "react-icons/io5";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";

export default function AuthComponent() {
    const {authData, userObject} = useAppUser();
    const {accessGranted, isLoading} = useAccess({
        principal: {
            id: userObject.user?.primaryEmailAddress?.emailAddress!,
            roles: userObject.user?.publicMetadata["roles"] as string[]
        },
        resource: {
            kind: "product",
            id: "product_1"
        },
        action: "update",
        enabled: !!userObject.user?.primaryEmailAddress?.emailAddress
    });

    return <div>
        <h1 className="mb-3">Clerk Auth</h1>
        {authData.isLoaded ?
            <div className="flex items-center gap-4">
                {!userObject.user ?
                    <>
                        <PrimaryButton href="/auth/sign-up">Sign Up</PrimaryButton>
                        <SecondaryButton href="/auth/sign-in">Log In</SecondaryButton>
                    </> :
                    <>
                        {/*<UserButton userProfileMode="navigation" userProfileUrl="/auth/profile"/>*/}
                        <UserButton >
                            <UserButton.UserProfilePage label="Test page" labelIcon={<IoGlobeOutline />} url="test">
                                <h1>This is a test page</h1>
                            </UserButton.UserProfilePage>
                            <UserButton.UserProfileLink url="/" label="Test link" labelIcon={<IoLinkOutline />} />
                        </UserButton>
                        {accessGranted && <p className="text-red-500">Only admins should see this text</p>}
                    </>
                }
            </div>
            :
            <p>LOADING DATA...</p>
        }
    </div>
}