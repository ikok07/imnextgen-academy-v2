import {NextRequest, NextResponse} from "next/server";
import {getInjection} from "@/di/container";
import Stripe from "stripe";
import {Module} from "@/drizzle/schema/modules";

export async function POST(req: NextRequest) {
    const event = await getInjection("IValidateWebhookController")(await req.text(), req.headers.get("stripe-signature") ?? undefined, process.env.STRIPE_WEBHOOK_SECRET!);
    switch (event.type) {
        case "customer.subscription.created":
            await handleSubscriptionEnable(event);
            break;
        case "customer.subscription.resumed":
            await handleSubscriptionEnable(event);
            break;
        case "customer.subscription.deleted":
            await handleSubscriptionDisable(event);
            break;
        case "checkout.session.completed":
            await handleCheckoutComplete(event);
            break;
    }

    return NextResponse.json({status: "success"});
}

async function handleSubscriptionEnable(event: Stripe.CustomerSubscriptionCreatedEvent | Stripe.CustomerSubscriptionResumedEvent) {
    if (event.data.object.status !== "active" && event.data.object.status !== "trialing") return NextResponse.json({error: "Subscription not paid!"}, {status: 401});

    const customer = await getInjection("IGetCustomerController")(event.data.object.customer as string);
    if (customer.deleted) return NextResponse.json({error: "Customer deleted!"}, {status: 401});

    const profile = await getInjection("IGetProfileByEmailController")(customer.email ?? undefined);

    await getInjection("ICreateUserSubscriptionUseCase")({
        profile_id: profile.id,
        tier_id: event.data.object.metadata.tier_id
    });
}

async function handleSubscriptionDisable(event: Stripe.CustomerSubscriptionDeletedEvent) {
    const customer = await getInjection("IGetCustomerController")(event.data.object.customer as string);
    if (customer.deleted) return NextResponse.json({error: "Customer deleted!"}, {status: 401});

    const profile = await getInjection("IGetProfileByEmailController")(customer.email ?? undefined);

    await getInjection("IRemoveUserSubscriptionController")(profile.id);
}

async function handleCheckoutComplete(event: Stripe.CheckoutSessionCompletedEvent) {
    const profile = await getInjection("IGetProfileByEmailController")(event.data.object.customer_email ?? undefined);

    if (typeof event.data.object.subscription === "string") {
        const subscription = await getInjection("IGetSubscriptionController")(event.data.object.subscription);
        await getInjection("ICreateUserSubscriptionUseCase")({
            profile_id: profile.id,
            tier_id: subscription.metadata.tier_id
        });
    }

    if (event.data.object.line_items) {
        const productIds = event.data.object.line_items.data.map(item => item.price).filter(p => !!p).map(p => p.product as string);
        const modules: Module[] = await getInjection("IGetModulesByProductIdsUseCase")(productIds);

        await getInjection("IAddUserBoughtModulesController")(profile.id, modules.map(m => m.id));
    }
}