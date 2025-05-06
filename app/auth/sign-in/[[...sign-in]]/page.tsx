import {SignIn} from "@clerk/nextjs";
import Image from "next/image";

export default async function Page() {
    return <div className="relative grid min-w-[100vw] min-h-[100vh] place-content-center">
        <Image alt="background" src="/setup/background.jpg" fill className="opacity-50 object-cover -z-10"/>
        <div className="absolute invisible dark:visible inset-0 bg-black opacity-70"/>
        <SignIn />
    </div>
}