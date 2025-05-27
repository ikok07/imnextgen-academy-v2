import {Testimonial} from "@/src/entities/models/homepage/testimonial";
import Image from "next/image";
import {IoPerson} from "react-icons/io5";

type TestimonialRowProps = {
    index: number,
    text: string,
    name: string,
    image?: string
}

export default function TestimonialRow({index, text, name, image}: TestimonialRowProps) {
    return <div className="grid grid-cols-[3rem_1fr] gap-5 items-center">
        <h3 className="justify-self-center text-5xl font-black z-20">{index + 1}</h3>
        <div className="text-white">
            <h1 className="text-sm xs:text-[1rem] sm:text-lg italic font-light">"{text}"</h1>
            <div className="flex items-center gap-3 mt-2">
                {image && <div className="relative w-[2rem] h-[2rem] rounded-full overflow-hidden"><Image alt={name} src={image} fill className="object-cover" /></div>}
                <h4 className="uppercase font-bold">{name}</h4>
            </div>
        </div>
    </div>
}