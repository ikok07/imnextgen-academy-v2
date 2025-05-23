import Image from "next/image";
import {Card} from "@/app/_components/ui/shadcn/card";

type TeamMemberBoxProps = {
    image: string,
    name: string,
    role: string
}

export default function TeamMemberBox({image, name, role}: TeamMemberBoxProps) {
    return <Card className="max-w-[17rem] md:max-w-[15rem] mx-auto w-full grid grid-rows-[1fr_auto]">
        <div className="relative w-full h-[20rem] md:h-full rounded-t-lg overflow-hidden"><Image alt={name} src={image} fill className="object-cover object-top" /></div>
        <div className="px-3 pb-3">
            <h3 className="text-lg font-semibold mt-2">{name}</h3>
            <p className="paragraph !text-[0.9rem]">{role}</p>
        </div>
    </Card>
}