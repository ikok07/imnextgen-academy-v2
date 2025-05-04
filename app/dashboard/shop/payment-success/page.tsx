import {IoCheckmarkCircleOutline} from "react-icons/io5";
import {Card, CardContent} from "@/app/_components/ui/shadcn/card";
import SuccessfulPaymentClassroomButton
    from "@/app/_components/dashboard/shop/payment/SuccessfulPaymentClassroomButton";

export default function Page() {
    return <div className="w-[95%] max-w-[50rem] mx-auto mt-10">
        <Card>
            <CardContent className="grid place-content-center text-center py-9">
                <IoCheckmarkCircleOutline className="mx-auto text-4xl text-cta"/>
                <h1 className="text-2xl font-bold mt-1">Успешно плащане</h1>
                <p className="text-sm md:text-[1rem] text-primary/70 mt-1">Вече може да се насладиш на закупените от теб предимства</p>
                <div className="mx-auto mt-6"><SuccessfulPaymentClassroomButton /></div>
            </CardContent>
        </Card>
    </div>
}