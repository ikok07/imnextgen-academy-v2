import {Card, CardContent} from "@/app/_components/ui/shadcn/card";
import {IoCheckmarkCircleOutline} from "react-icons/io5";
import SuccessfulPaymentClassroomButton
    from "@/app/_components/dashboard/shop/payment/SuccessfulPaymentClassroomButton";

export default function Page() {
    return <div className="w-[95%] max-w-[50rem] mx-auto mt-10">
        <Card>
            <CardContent className="grid place-content-center text-center py-9">
                <IoCheckmarkCircleOutline className="mx-auto text-4xl text-cta"/>
                <h1 className="text-2xl font-bold mt-1">Успешна заявка за кредит</h1>
                <p className="text-sm md:text-[1rem] text-primary/70 mt-1">Очаквай в най-скоро време лизингодателят да се свърже по телефон.</p>
                <div className="mx-auto mt-6"><SuccessfulPaymentClassroomButton /></div>
            </CardContent>
        </Card>
    </div>
}