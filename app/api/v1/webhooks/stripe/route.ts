import {NextRequest, NextResponse} from "next/server";
import {getInjection} from "@/di/container";
import Stripe from "stripe";
import {Profile} from "@/drizzle/schema/profiles";
import {FullProfile} from "@/src/entities/models/auth/full-profile";

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
        case "customer.created":
            await handleCustomerCreated(event);
            break;
        case "customer.deleted":
            await handleCustomerDeleted(event);
            break;
    }

    return NextResponse.json({status: "success"});
}

async function handleSubscriptionEnable(event: Stripe.CustomerSubscriptionCreatedEvent | Stripe.CustomerSubscriptionResumedEvent) {
    if (event.data.object.status !== "active" && event.data.object.status !== "trialing") return NextResponse.json({error: "Subscription not paid!"}, {status: 401});

    const customer = await getInjection("IGetCustomerController")(event.data.object.customer as string);
    if (customer.deleted) return NextResponse.json({error: "Customer deleted!"}, {status: 401});

    const profile = await getInjection("IGetProfileByCustomerIdController")(customer.id);

    await getInjection("ICreateUserSubscriptionUseCase")({
        profile_id: profile.id,
        tier_id: event.data.object.metadata.tierId
    });
}

async function handleSubscriptionDisable(event: Stripe.CustomerSubscriptionDeletedEvent) {
    const customer = await getInjection("IGetCustomerController")(event.data.object.customer as string);
    if (customer.deleted) return NextResponse.json({error: "Customer deleted!"}, {status: 401});

    const profile = await getInjection("IGetProfileByCustomerIdController")(customer.id);

    await getInjection("IRemoveUserSubscriptionController")(profile.id);
}

async function handleCheckoutComplete(event: Stripe.CheckoutSessionCompletedEvent) {
    let profile: FullProfile | undefined;
    if (event.data.object.customer) {
        profile = await getInjection("IGetProfileByCustomerIdController")((event.data.object.customer as string | undefined));;
    } else {
        profile = await getInjection("IGetProfileByEmailController")(event.data.object.customer_email ?? undefined);
    }

    // if (typeof event.data.object.subscription === "string") {
    //     const subscription = await getInjection("IGetSubscriptionController")(event.data.object.subscription);
    //     await getInjection("ICreateUserSubscriptionUseCase")({
    //         profile_id: profile.id,
    //         tier_id: subscription.metadata.tier_id
    //     });
    // }

    const lineItems = (await getInjection("IGetCheckoutSessionsLineItemsController")(event.data.object.id)).filter(i => i.price?.type !== "recurring");
    if (lineItems.length > 0) {
        const modules = await getInjection("IGetModulesByProductIdsController")(lineItems.map(i => i.price!.product as string));
        await getInjection("IAddUserBoughtModulesController")(profile.id, modules.map(m => m.id));
    }
}

async function handleCustomerCreated(event: Stripe.CustomerCreatedEvent) {
    if (!event.data.object.email) throw new Error("Customer doesn't have email!");

    await getInjection("IUpdateProfileController")({
        email: event.data.object.email,
        data: {
            payment_customer_id: event.data.object.id
        }
    });
}

async function handleCustomerDeleted(event: Stripe.CustomerDeletedEvent) {
    if (!event.data.object.email) throw new Error("Customer doesn't have email!");

    await getInjection("IUpdateProfileController")({
        email: event.data.object.email,
        data: {
            payment_customer_id: null
        }
    });
}