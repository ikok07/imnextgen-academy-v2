import { IUserSubscriptionsRepository } from "@/src/application/repositories/payments/user-subscriptions.repository.interface"
import {
    IGetUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";
import {
    IGetUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";

export const USER_SUBSCRIPTIONS_SYMBOLS = {
    IUserSubscriptionsRepository: Symbol.for("IUserSubscriptionsRepository"),

    IGetUserSubscriptionsUseCase: Symbol.for("IGetUserSubscriptionsUseCase"),
    IGetUserSubscriptionsController: Symbol.for("IGetUserSubscriptionsController"),
}

export interface USER_SUBSCRIPTIONS_RETURN_TYPES {
    IUserSubscriptionsRepository: IUserSubscriptionsRepository,

    IGetUserSubscriptionsUseCase: IGetUserSubscriptionsUseCase,
    IGetUserSubscriptionsController: IGetUserSubscriptionsController,
}


