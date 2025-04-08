import {SignIn} from "@clerk/nextjs";

export default function Page() {
    return <div className="grid w-[100vw] h-[100vh] place-content-center">
        <SignIn />
    </div>
}