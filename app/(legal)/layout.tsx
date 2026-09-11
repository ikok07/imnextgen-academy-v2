import {ReactNode} from "react";
import HomepageNavbar from "@/app/_components/home/nav/HomepageNavbar";
import Footer from "@/app/_components/home/footer/Footer";

/** Общ изглед за правните страници: същата навигация и подвал като началната. */
export default function LegalLayout({children}: {children: ReactNode}) {
    return <main className="homepage space-y-10">
        <HomepageNavbar />
        <article className="legal-page w-[95%] max-w-[52rem] mx-auto pb-16">
            {children}
        </article>
        <Footer />
    </main>
}
