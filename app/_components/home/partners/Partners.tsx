import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/app/_components/ui/home/SectionHeading";

export default function Partners() {
    return <section id="partners" className="home-center-section grid md:grid-cols-[1.25fr_2fr] items-center justify-center text-center">
        <SectionHeading title="Нашите партньори" description="Партньори, даващи възможност на бъдещите програмисти за развитие в IT сектора" className="md:text-left"/>
        <div className="flex items-center justify-center md:justify-evenly flex-wrap">
            <Link target="_blank" href="https://rappit.io/"><Image alt="Rappit - Deliver Outperformance" src="/home/partners/rappit.svg" width={200} height={200} className="transition-all duration-200"/></Link>
            <Link target="_blank" href="https://infinno.com/"><Image alt="Infinno" src="/home/partners/infinno.svg" width={200} height={200} className="transition-all duration-200"/></Link>
            <Link target="_blank" href="https://www.mypos.com/"><Image alt="Infinno" src="/home/partners/mypos.svg" width={100} height={100} className="transition-all duration-200"/></Link>
        </div>
    </section>
}