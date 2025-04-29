import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import StripePaymentSheet from "@/app/_components/dashboard/shop/payment/StripePaymentSheet";
import {createCheckoutSession} from "@/app/dashboard/shop/actions";
import {z} from "zod";
import {getUser} from "@/app/dashboard/actions";
import { Routes } from "@/app/_utils/nav/routes";
import PaymentSheetSkeleton from "@/app/_components/dashboard/shop/payment/PaymentSheetSkeleton";
import {Suspense} from "react";
import {getUserBoughtModules, getUserSubscription} from "@/app/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCloudOffline} from "react-icons/io5";
import RedirectComponent from "@/app/_components/ui/RedirectComponent";

const searchParamsSchema = z.object({
    searchParams: z.object({
        productIds: z.string(),
        hasSubscription: z.string()
    })
});

export default async function Page(props: z.infer<typeof searchParamsSchema>) {
    return <div>
        <DashboardPageTitle>Завършване на плащане</DashboardPageTitle>
        <div className="w-full max-w-[60rem] mx-auto grid md:grid-cols-[1.25fr_1fr]">
            <Suspense fallback={<PaymentSheetSkeleton />}>
                <InnerContent {...props} />
            </Suspense>
        </div>
    </div>
}

export async function InnerContent(props: z.infer<typeof searchParamsSchema>) {
    try {
        const {data: parsedProps, error: propsError} = searchParamsSchema.safeParse(props);
        if (propsError) throw new Error("Invalid props");

        const userResponse = await getUser();
        if (!userResponse.success || !userResponse.value.user || !userResponse.value.dbProfile) throw new Error("User is not available!");

        const [userSubscriptionResponse, boughtModulesResponse] = await Promise.all([
            getUserSubscription(userResponse.value.user.id),
            getUserBoughtModules(userResponse.value.user.id),
        ]);

        if (!userSubscriptionResponse.success) throw new Error("User subscription is not available!");
        if (!boughtModulesResponse.success) throw new Error("Bought modules are not available!");

        let productIds = parsedProps.searchParams.productIds.split(',')
        const alreadyPurchasedSubscription = productIds.some(productId => userSubscriptionResponse.value?.tier?.stripe_product_id == productId);

        productIds = productIds.filter(productId => {
            return userSubscriptionResponse.value?.tier?.stripe_product_id != productId &&
                !boughtModulesResponse.value.some(v => {
                    return v.module.stripe_product_id === productId;
                })
        });

        if (productIds.length === 0) return <RedirectComponent path={Routes.dashboard.shop.base()} />

        const checkoutSession = await createCheckoutSession({
            productIds,
            customerId: userResponse.value.dbProfile.payment_customer_id || undefined,
            customerEmail: userResponse.value.user.emailAddresses[0].emailAddress,
            locale: "bg",
            mode: !alreadyPurchasedSubscription && parsedProps.searchParams.hasSubscription === "true" ? "subscription" : "payment",
            returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${Routes.dashboard.shop.base()}`
        });

        if (!checkoutSession.success) throw new Error("Checkout session is not available!");

        return <>
            <div className="grid place-content-center">
                <h1>DSK BANK</h1>
            </div>
            <div>
                <StripePaymentSheet clientSecret={checkoutSession.value.client_secret} />
            </div>
        </>
    } catch(e) {
        return <PrimaryErrorMessage
            Icon={IoCloudOffline}
            message="Формата за плащане не можа да бъде заредена"
            title="Възникна грешка"
            className="col-span-2"
        />
    }
}