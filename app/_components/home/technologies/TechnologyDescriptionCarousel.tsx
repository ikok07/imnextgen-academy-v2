"use client"

import {cn} from "@/app/_utils/cn";
import Image from "next/image";
import {TECHNOLOGIES} from "@/app/_utils/home/technologies/technologies";

type TechnologyDescriptionCarouselProps = {
    activeTechnologyIndex: number
}

export default function TechnologyDescriptionCarousel({activeTechnologyIndex}: TechnologyDescriptionCarouselProps) {
    return <div className="relative overflow-hidden">
        <div className="absolute w-4 h-full bg-gradient-to-l from-background to-transparent right-0 z-20"/>
        <div
            style={{
                transform: `translateX(-${activeTechnologyIndex * 100}%)`
            }}
            className={cn(
                "flex items-center",
                "transition-transform duration-500 [transition-timing-function:cubic-bezier(.65,.05,.36,1)]"
            )}
        >
            {TECHNOLOGIES.map((technology, index) => {
                return <div className="flex-scroll" key={index}>
                    <div className="flex items-center gap-2">
                        <Image alt={technology.title} src={technology.image} width={40} height={40} />
                        <h3 className="uppercase font-black text-2xl">{technology.title}</h3>
                    </div>
                    <p className="paragraph mt-3 text-sm">{technology.description}</p>
                </div>
            })}
        </div>
    </div>
}