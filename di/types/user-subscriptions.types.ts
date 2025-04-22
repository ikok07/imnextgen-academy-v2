import { IUserSubscriptionsRepository } from "@/src/application/repositories/payments/user-subscriptions.repository.interface"
import {
    IAddUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/add-user-subscriptions.use-case";
import {
    IAddUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/add-user-subscriptions.controller";
import {
    IUpdateUserSubscriptionTierUseCase
} from "@/src/application/use-cases/payments/subscriptions/update-user-subscription-tier.use-case";
import {
    IUpdateUserSubscriptionTierController
} from "@/src/interface-adapters/controllers/payments/update-user-subscription-tier.controller";
import {
    IGetUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/get-user-subscriptions.controller";
import {
    IGetUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";

export const USER_SUBSCRIPTIONS_SYMBOLS = {
    IUserSubscriptionsRepository: Symbol.for("IUserSubscriptionsRepository"),

    IGetUserSubscriptionsUseCase: Symbol.for("IGetUserSubscriptionsUseCase"),
    IGetUserSubscriptionsController: Symbol.for("IGetUserSubscriptionsController"),

    IAddUserSubscriptionsUseCase: Symbol.for("IAddUserSubscriptionsUseCase"),
    IAddUserSubscriptionsController: Symbol.for("IAddUserSubscriptionsController"),

    IUpdateUserSubscriptionTierUseCase: Symbol.for("IUpdateUserSubscriptionTierUseCase"),
    IUpdateUserSubscriptionTierController: Symbol.for("IUpdateUserSubscriptionTierController")
}

export interface USER_SUBSCRIPTIONS_RETURN_TYPES {
    IUserSubscriptionsRepository: IUserSubscriptionsRepository,

    IGetUserSubscriptionsUseCase: IGetUserSubscriptionsUseCase,
    IGetUserSubscriptionsController: IGetUserSubscriptionsController,

    IAddUserSubscriptionsUseCase: IAddUserSubscriptionsUseCase,
    IAddUserSubscriptionsController: IAddUserSubscriptionsController,

    IUpdateUserSubscriptionTierUseCase: IUpdateUserSubscriptionTierUseCase,
    IUpdateUserSubscriptionTierController: IUpdateUserSubscriptionTierController
}


