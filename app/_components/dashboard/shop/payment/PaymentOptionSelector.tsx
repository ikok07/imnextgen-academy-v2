import {PAYMENT_OPTIONS, usePaymentPage} from "@/app/_providers/PaymentPageProvider";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {getPaymentOptionData} from "@/app/_utils/shop/payment/getPaymentOptionData";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PaymentOptionSelectorSkeleton
    from "@/app/_components/dashboard/shop/payment/skeleton/PaymentOptionSelectorSkeleton";

export default function PaymentOptionSelector() {
    const {viewLoaded} = useViewLoaded()
    const {selectedPaymentOption, setSelectedPaymentOption} = usePaymentPage();

    if (!viewLoaded) return <PaymentOptionSelectorSkeleton />

    return <Card className="h-max">
        <CardHeader>
            <CardTitle className="text-xl">Начин на плащане</CardTitle>
            <CardDescription className="text-[1rem]">Избери най-удобния за теб начин на плащане</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center flex-wrap gap-3">
                {PAYMENT_OPTIONS.map((option, index) => {
                    const data = getPaymentOptionData(option);
                    if (!data) return;

                    return <PrimaryButton
                        key={index}
                        onClick={() => setSelectedPaymentOption(option)}
                        className={`${selectedPaymentOption !== option ? "bg-inactive-gradient text-primary" : ""}`}
                    >
                        <data.icon className={""} />
                        {data.label}
                    </PrimaryButton>
                })}
            </div>
        </CardContent>
    </Card>
}