import DashboardPageTitle from "@/app/_components/dashboard/DashboardPageTitle";
import StripePaymentSheet from "@/app/_components/dashboard/shop/payment/StripePaymentSheet";
import {createCheckoutSession, getFullSubscriptionTiers, getPaidModules} from "@/app/dashboard/shop/actions";
import {z} from "zod";
import {getUser} from "@/app/dashboard/actions";
import { Routes } from "@/app/_utils/nav/routes";
import {Suspense} from "react";
import {getUserBoughtModules, getUserSubscription} from "@/app/actions";
import PrimaryErrorMessage from "@/app/_components/ui/errors/PrimaryErrorMessage";
import {IoCalendar, IoCash, IoCloudOffline} from "react-icons/io5";
import RedirectComponent from "@/app/_components/ui/RedirectComponent";
import {getInjection} from "@/di/container";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";
import DSKBankCreditForm from "@/app/_components/dashboard/shop/payment/bank/dsk/DSKBankCreditForm";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import BankCreditFormPropertyBox from "@/app/_components/dashboard/shop/payment/bank/BankCreditFormPropertyBox";
import {PaymentPageProvider} from "@/app/_providers/PaymentPageProvider";
import StripePaymentSheetSkeleton from "@/app/_components/dashboard/shop/payment/skeleton/StripePaymentSheetSkeleton";
import PaymentPageClientContent from "@/app/_components/dashboard/shop/payment/PaymentPageClientContent";
import PaymentPageSkeleton from "@/app/_components/dashboard/shop/payment/skeleton/PaymentPageSkeleton";
import {SerializableUser} from "@/src/entities/models/auth/serializable-user";

const searchParamsSchema = z.object({
    searchParams: z.object({
        productIds: z.string(),
        hasSubscription: z.string()
    })
});

export default async function Page(props: z.infer<typeof searchParamsSchema>) {
    return <div>
        <DashboardPageTitle>Завършване на плащане</DashboardPageTitle>
        <div className="w-full max-w-[50rem] mx-auto grid lg:grid-cols-[1.6fr_2fr] gap-4">
            <Suspense fallback={<PaymentPageSkeleton />}>
                <InnerContent {...props} />
            </Suspense>
        </div>
    </div>
}

async function InnerContent(props: z.infer<typeof searchParamsSchema>) {
    try {
        const {data: parsedProps, error: propsError} = searchParamsSchema.safeParse(props);
        if (propsError) throw new Error("Invalid props");

        const userResponse = await getUser();
        if (!userResponse.success || !userResponse.value.user || !userResponse.value.dbProfile) throw new Error("User is not available!");

        const [userSubscriptionResponse, fullSubscriptionsResponse, paidModulesResponse, boughtModulesResponse] = await Promise.all([
            getUserSubscription(userResponse.value.user.id),
            getFullSubscriptionTiers(),
            getPaidModules(),
            getUserBoughtModules(userResponse.value.user.id),
        ]);

        if (!userSubscriptionResponse.success) throw new Error("User subscription is not available!");
        if (!fullSubscriptionsResponse.success) throw new Error("Full subscription tiers are not available!");
        if (!paidModulesResponse.success) throw new Error("Paid modules are not available!");
        if (!boughtModulesResponse.success) throw new Error("Bought modules are not available!");

        const userHasSubscription = !!userSubscriptionResponse.value;
        let productIds = parsedProps.searchParams.productIds.split(',')

        // Remove subscription product id if user is already subscribed
        if (userHasSubscription) {
            productIds = productIds.filter(productId => {
                return !fullSubscriptionsResponse.value.some(s => s.stripe_product_id === productId)
            });
        }

        // Remove already bought and included in subscription product ids.
        productIds = productIds.filter(productId => {
            return !boughtModulesResponse.value.some(v => {
                    return v.module.stripe_product_id === productId;
                }) && !paidModulesResponse.value.some(v => {
                    return v.stripe_product_id === productId && v.access === "subscription-or-paid" && parsedProps.searchParams.hasSubscription === "true"
                });
        });

        if (productIds.length === 0) return;
        if (productIds.length === 0) return <RedirectComponent path={Routes.dashboard.shop.base()} />

        const serializableUser: SerializableUser = {
            id: userResponse.value.user.id,
            firstName: userResponse.value.user.firstName,
            lastName: userResponse.value.user.lastName,
            emailAddress: userResponse.value.user.emailAddresses[0].emailAddress,
            phoneNumber: userResponse.value.user.phoneNumbers[0].phoneNumber
        }
        return <PaymentPageProvider>
            <PaymentPageClientContent
                user={serializableUser}
                productIds={productIds}
                email={userResponse.value.user.emailAddresses[0].emailAddress}
                phoneNumber={userResponse.value.user.phoneNumbers[0].phoneNumber}
                customerId={userResponse.value.dbProfile.payment_customer_id ?? undefined}
                userHasSubscription={userHasSubscription}
                hasSubscriptionSearchParam={parsedProps.searchParams.hasSubscription}
                tierId={!userHasSubscription && parsedProps.searchParams.hasSubscription === "true" ? (await getInjection("IGetFullSubscriptionTiersByProductIdsController")(productIds))[0].id : undefined}
            />
        </PaymentPageProvider>
    } catch(e) {
        console.error(e);
        return <PrimaryErrorMessage
            Icon={IoCloudOffline}
            message="Формата за плащане не можа да бъде заредена"
            title="Възникна грешка"
            className="col-span-2"
        />
    }
}