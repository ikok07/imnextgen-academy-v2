import Trapezoid from "@/app/_components/ui/shapes/Trapezoid";

export default function Testimonials() {
    return <section id="testimonials" className="relative bg-black-background-gradient h-[30rem]">
        <Trapezoid width="70%" height={"50px"} angle="50px" color="#ffffff" className="absolute top-0 left-1/2 -translate-x-1/2 rotate-180"/>
        <Trapezoid width="70%" height={"50px"} angle="50px" color="#ffffff" className="absolute bottom-0 left-1/2 -translate-x-1/2"/>
    </section>
}