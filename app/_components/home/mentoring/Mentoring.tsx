import {Card} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";

export default function Mentoring() {
    return <section id="mentoring" className="home-center-section">
        <Card className="grid md:grid-cols-[1.25fr_1fr] min-h-[20rem]">
            <div className="p-5 md:p-10 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black">Не разчитай само на себе си</h1>
                    <p className="paragraph mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="flex items-center gap-2 mt-5">
                    <strong className="text-3xl font-black text-cta">3X</strong>
                    <h6 className="leading-[1.4] text-primary/70 font-semibold">ментроски срещи /<br/>седмица</h6>
                </div>
            </div>
            <div className="relative h-[20rem] rounded-b-xl rounded-r-none md:rounded-r-xl md:rounded-b-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[30%] h-full bg-gradient-to-r from-background/30 to-transparent z-10" />
                <Image alt="Професионални ментори" src="/home/mentoring/mentors.jpeg" fill className="object-cover" />
            </div>
        </Card>
    </section>
}