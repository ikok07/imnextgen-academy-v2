import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoVideocamOff} from "react-icons/io5";
import {Card} from "@/app/_components/ui/shadcn/card";

export default function PlayerVideoError() {
    return <Card className="max-w-[50rem] w-[97%] md:mx-auto aspect-video grid place-content-center"><PrimaryErrorMessage Icon={IoVideocamOff} message="Видеото не може да бъде заредено!" title="Възникна грешка" /></Card>
}