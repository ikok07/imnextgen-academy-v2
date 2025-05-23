"use client"

import {Technology} from "@/src/entities/models/homepage/technology";
import {useMemo, useState} from "react";
import {Card} from "@/app/_components/ui/shadcn/card";
import {IoArrowBack, IoArrowForward} from "react-icons/io5";
import {cn} from "@/app/_utils/cn";
import TechnologyDescriptionCarousel from "@/app/_components/home/technologies/TechnologyDescriptionCarousel";
import {TECHNOLOGIES} from "@/app/_utils/home/technologies/technologies";
import TechnologyCodeSnippetCarousel from "@/app/_components/home/technologies/TechnologyCodeSnippetCarousel";

export default function Technologies() {
    const [activeTechnologyIndex, setActiveTechnologyIndex] = useState(0);

    const arrowsContainerBaseClass = useMemo(() => "bg-cta rounded-full text-background text-lg w-8 h-8 grid place-content-center transition-all duration-500 ease-in-out", []);

    return <section className="home-center-section">
        <Card className="grid md:grid-cols-2 overflow-hidden">
            <div className="grid p-4 md:p-6">
                <TechnologyDescriptionCarousel activeTechnologyIndex={activeTechnologyIndex} />
                <div className="flex items-center gap-3 mt-3">
                    <button
                        onClick={() => setActiveTechnologyIndex(v => v - 1)}
                        disabled={activeTechnologyIndex <= 0}
                        className={cn(
                            arrowsContainerBaseClass,
                            {
                                "bg-inactive-gradient": activeTechnologyIndex <= 0
                            }
                        )}
                    >
                        <IoArrowBack />
                    </button>
                    <button
                        onClick={() => setActiveTechnologyIndex(v => v + 1)}
                        disabled={activeTechnologyIndex >= TECHNOLOGIES.length - 1}
                        className={cn(
                            arrowsContainerBaseClass,
                            {
                                "bg-secondary text-primary": activeTechnologyIndex >= TECHNOLOGIES.length - 1
                            }
                        )}
                    >
                        <IoArrowForward />
                    </button>
                </div>
            </div>
            <TechnologyCodeSnippetCarousel activeTechnologyIndex={activeTechnologyIndex} />
        </Card>
    </section>
}