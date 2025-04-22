import {
    IAddUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/add-user-subscriptions.use-case";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";
import {InputParseError} from "@/src/entities/errors/common";

export type IAddUserSubscriptionsController = ReturnType<typeof addUserSubscriptionsController>;

export const addUserSubscriptionsController = (
    addUserSubscriptionsUseCase: IAddUserSubscriptionsUseCase
) => (userId: string | undefined, tier: SubscriptionTier | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!tier) throw new InputParseError("Invalid tier");

    return addUserSubscriptionsUseCase(userId, tier);
}