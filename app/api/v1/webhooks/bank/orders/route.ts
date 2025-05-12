import {getInjection} from "@/di/container";
import {NextRequest, NextResponse} from "next/server";
import {DSKPaymentStatusEnum} from "@/src/entities/models/payments/dsk/get-status-options";
import crypto from "node:crypto"

export type CheckError = { found: boolean, error?: Error };

async function checkForModule(userId: string, productId: string): Promise<CheckError> {
    try {
        const result = await getInjection("IGetModulesByProductIdsController")([productId]);
        if (result.length === 0) return {found: false};

        await getInjection("IAddUserBoughtModulesController")(userId, [result[0].id]);
        return {found: true};
    } catch(e) {
        return {found: false, error: e as Error};
    }
}

async function checkForSubscription(userId: string, productId: string): Promise<CheckError> {
    try {
        const result = await getInjection("IGetFullSubscriptionTiersByProductIdsController")([productId]);
        if (result.length === 0) return {found: false};

        await getInjection("ICreateUserSubscriptionController")({
            profile_id: userId,
            tier_id: result[0].id
        })
        return {found: true};
    } catch(e) {
        return {found: false, error: e as Error};
    }
}

export async function POST(req: NextRequest) {
    const token = req.headers.get("Authorization");
    if (!token) return NextResponse.json({error: "Unauthorized"}, {status: 401});
    if (!(await getInjection("IValidateBackendKeyUseCase")(token))) return NextResponse.json({error: "Unauthorized"}, {status: 401});

    const orders = await getInjection("IGetPendingOrdersUseCase")();
    for (const order of orders) {
        const errors: Error[] = [];
        let bankError: boolean = false;

        const paymentStatus = await getInjection("IGetPaymentStatusController")({orderId: order.id});
        if (paymentStatus.status === DSKPaymentStatusEnum.LOAN_TAKEN) {
            for (const product of order.products) {
                const moduleCheckResult = await checkForModule(order.profile_id, product.product_id);
                if (moduleCheckResult.found) continue;
                if (moduleCheckResult.error) errors.push(moduleCheckResult.error);

                const subscriptionCheckResult = await checkForSubscription(order.profile_id, product.product_id);
                if (subscriptionCheckResult.found) continue;
                if (subscriptionCheckResult.error) errors.push(subscriptionCheckResult.error);
            }
        } else if (
            paymentStatus.status === DSKPaymentStatusEnum.UNABLE_TO_CONTACT_CUSTOMER ||
            paymentStatus.status === DSKPaymentStatusEnum.APPLICATION_TERMINATED ||
            paymentStatus.status === DSKPaymentStatusEnum.APPLICATION_CANCELED
        ) bankError = true;
        else continue;

        if (errors.length > 0) console.error(`Bank orders CRON job errors: ${errors}`);
        if (bankError) console.error("Customer didn't take the loan");

        await getInjection("IUpdateOrderController")(order.id, {status: bankError ? "failed" : errors.length > 0 ? "cron-failed" : "success"});
    }

    return NextResponse.json({status: "success"});
}