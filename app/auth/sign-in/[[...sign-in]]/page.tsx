import {SignIn} from "@clerk/nextjs";
import Image from "next/image";

export default async function Page() {
    return <div className="grid min-w-[100vw] min-h-[100vh] my-3 place-content-center">
        <Image alt="background" src="/setup/background.jpg" fill className="opacity-50 object-cover -z-10"/>
        <SignIn />
    </div>
}