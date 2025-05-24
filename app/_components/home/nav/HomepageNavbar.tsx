import Image from "next/image";
import HomepageNavLinks from "@/app/_components/home/nav/HomepageNavLinks";
import HomepageMobileNavbar from "@/app/_components/home/nav/HomepageMobileNavbar";
import HomepageNavbarButtons from "@/app/_components/home/nav/HomepageNavbarButtons";
import {Suspense} from "react";

export default async function HomepageNavbar() {
    return <Suspense fallback={<h1>LOADING...</h1>}>
        <InnerContent />
    </Suspense>
}

async function InnerContent() {
    return <div className="flex items-center justify-between mt-3 w-[95%] max-w-[90rem] mx-auto">
        <Image alt="I&M NextGen Academy" src="/logo.png" width={200} height={50} />
        <div className="hidden lg:block"><HomepageNavLinks /></div>
        <div className="hidden lg:flex items-center gap-3">
            <HomepageNavbarButtons />
        </div>
        <div className="block lg:hidden"><HomepageMobileNavbar /></div>
    </div>
}