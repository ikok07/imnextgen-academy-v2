import {
    ICreateUserSubscriptionUseCase
} from "@/src/application/use-cases/payments/subscriptions/create-user-subscription.use-case";
import {
    UserSubscriptionInsert,
    userSubscriptionInsertSchema,
} from "@/drizzle/schema/user_subscriptions";
import {InputParseError} from "@/src/entities/errors/common";

export type ICreateUserSubscriptionController = ReturnType<typeof createUserSubscriptionController>;

export const createUserSubscriptionController = (
    createUserSubscriptionUseCase: ICreateUserSubscriptionUseCase
) => async (subscription: Partial<UserSubscriptionInsert>) => {

    const {data: parsedSubscription, error} = userSubscriptionInsertSchema.safeParse(subscription);
    if (error) throw new InputParseError(`Invalid subscription object: ${error}`);

    return createUserSubscriptionUseCase(parsedSubscription);
}