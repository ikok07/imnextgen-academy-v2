import {Card} from "@/app/_components/ui/shadcn/card";
import {cn} from "@/app/_utils/cn";
import Image from "next/image";

type TileBoxProps = {
    image: string,
    title: string,
    description: string,
    className?: string
}

export default function TileBox({image, title, description, className}: TileBoxProps) {
    return <Card className={
        cn(
            "grid grid-rows-[1fr_auto] w-full h-full min-h-[25rem] md:min-h-max",
            "md:hover:scale-[1.01] md:hover:shadow-md transition-all duration-200 ease-in-out",
            className
        )
    }>
        <div className="relative w-full h-full rounded-xl overflow-hidden">
            <div className="absolute bg-gradient-to-t from-background to-transparent inset-0 z-10"/>
            <Image alt={title} src={image} fill className="object-cover"/>
        </div>
        <div className="px-5 py-5">
            <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
            <p className="paragraph text-sm md:text-[1rem] mt-1">{description}</p>
        </div>
    </Card>
}