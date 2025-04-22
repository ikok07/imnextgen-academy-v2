import {
    IUpdateUserSubscriptionTierUseCase
} from "@/src/application/use-cases/payments/subscriptions/update-user-subscription-tier.use-case";
import {SubscriptionTier} from "@/drizzle/schema/user_subscriptions";
import {InputParseError} from "@/src/entities/errors/common";

export type IUpdateUserSubscriptionTierController = ReturnType<typeof updateUserSubscriptionTierController>;

export const updateUserSubscriptionTierController = (
    updateUserSubscriptionTierUseCase: IUpdateUserSubscriptionTierUseCase
) => async (userId: string | undefined, tier: SubscriptionTier | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");
    if (!tier) throw new InputParseError("Invalid tier");

    return updateUserSubscriptionTierUseCase(userId, tier);
}