import {
    IGetUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetUserSubscriptionsController = ReturnType<typeof getUserSubscriptionsController>;

export const getUserSubscriptionsController = (
    getUserSubscriptionsUseCase: IGetUserSubscriptionsUseCase
) => (userId: string | undefined) => {

    if (!userId) throw new InputParseError("Invalid userId!");

    return getUserSubscriptionsUseCase(userId)
}