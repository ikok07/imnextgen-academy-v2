import {IconType} from "react-icons";
import {Card} from "@/app/_components/ui/shadcn/card";
import {cn} from "@/app/_utils/cn";

type SuitableQualityBoxProps = {
    Icon: IconType,
    title: string,
    description: string
}

export default function SuitableQualityBox({Icon, title, description}: SuitableQualityBoxProps) {
    return <Card className={cn(
        "py-5 px-3 rounded-xl w-full grid grid-cols-[auto_1fr] gap-3",
        "md:hover:scale-[1.01] md:hover:shadow-md transition-all duration-200 ease-in-out"
    )}>
        <Icon width={35} height={35} className="text-cta"/>
        <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="paragraph !text-[0.9rem] mt-1">{description}</p>
        </div>
    </Card>
}