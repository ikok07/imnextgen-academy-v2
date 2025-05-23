import Trapezoid from "@/app/_components/ui/shapes/Trapezoid";
import {TESTIMONIALS} from "@/app/_utils/home/testimonials/testimonials";
import TestimonialRow from "@/app/_components/home/testimonials/TestimonialRow";

export default function Testimonials() {
    return <section id="testimonials" className="relative bg-black-background-gradient h-[50rem]">
        <Trapezoid width="70%" height={"50px"} angle="50px" color="#ffffff" className="absolute top-0 left-1/2 -translate-x-1/2 rotate-180"/>
        <Trapezoid width="70%" height={"50px"} angle="50px" color="#ffffff" className="absolute bottom-0 left-1/2 -translate-x-1/2"/>
        <div className="relative grid grid-rows-4 gap-7 xs:gap-0 w-[95%] max-w-[45rem] h-full mx-auto py-24">
            <div className="absolute w-[3rem] top-20 bottom-20 rounded-md bg-white" />
            <div className="grid grid-cols-[3rem_1fr] gap-5 items-center">
                <h3 className="justify-self-center text-5xl font-black z-20">?</h3>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-white font-bold">Какво мислят някои от нашите ученици</h1>
            </div>
            {TESTIMONIALS.map((testimonial, index) => {
                return <TestimonialRow index={index} key={index} {...testimonial}/>
            })}
        </div>
    </section>
}