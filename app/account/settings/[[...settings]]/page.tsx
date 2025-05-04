"use client"

import {UserProfile} from "@clerk/nextjs";
import {IoCard} from "react-icons/io5";

export default function Page() {
    return <div className="w-[95%] max-w-max min-h-[100vh] mx-auto flex items-center">
        <UserProfile>
            <UserProfile.Link
                labelIcon={<IoCard />}
                label="Плащания"
                url={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!}
            />
        </UserProfile>
    </div>
}