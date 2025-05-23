import Image from "next/image";

export default function GraphicDesign() {
    return <section id="graphic-design" className="relative bg-black-background-gradient grid xl:grid-cols-2 w-full h-[22rem]">
        <div className="flex flex-col justify-center w-full h-full max-w-[50rem] pl-5 sm:pl-12 lg:pl-36 pr-5 z-20">
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-background">Графичен дизайн</h1>
            <p className="paragraph !text-background/70 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.</p>
            <div className="flex items-center gap-3 mt-7">
                <Image alt="Figma" src="/home/graphic-design/figma.svg" width={25} height={25} />
                <h3 className="font-bold text-2xl text-background">Figma</h3>
            </div>
        </div>
        <div className="absolute xl:relative inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70 sm:to-black/50 xl:to-transparent block xl:hidden z-10"/>
            <Image alt="Графичен дизайн" src="/home/graphic-design/graphic-designer-cutted.svg" fill className="object-cover hidden xl:block"/>
            <Image alt="Графичен дизайн" src="/home/graphic-design/graphic-designer.jpg" fill className="object-cover block xl:hidden"/>
        </div>
    </section>
}