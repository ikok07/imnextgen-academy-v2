import { ISubscriptionsRepository } from "@/src/application/repositories/payments/user-subscriptions.repository.interface"
import {
    IGetUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";
import {
    IGetUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import { IGetFullSubscriptionTiersUseCase } from "@/src/application/use-cases/payments/subscriptions/get-subscription-tiers.use-case";
import { IGetFullSubscriptionTiersController } from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers.controller";

export const SUBSCRIPTIONS_SYMBOLS = {
    ISubscriptionsRepository: Symbol.for("ISubscriptionsRepository"),

    IGetUserSubscriptionsUseCase: Symbol.for("IGetUserSubscriptionsUseCase"),
    IGetUserSubscriptionsController: Symbol.for("IGetUserSubscriptionsController"),

    IGetFullSubscriptionTiersUseCase: Symbol.for("IGetFullSubscriptionTiersUseCase"),
    IGetFullSubscriptionTiersController: Symbol.for("IGetFullSubscriptionTiersController")
}

export interface SUBSCRIPTIONS_RETURN_TYPES {
    ISubscriptionsRepository: ISubscriptionsRepository,

    IGetUserSubscriptionsUseCase: IGetUserSubscriptionsUseCase,
    IGetUserSubscriptionsController: IGetUserSubscriptionsController,

    IGetFullSubscriptionTiersUseCase: IGetFullSubscriptionTiersUseCase,
    IGetFullSubscriptionTiersController: IGetFullSubscriptionTiersController
}


