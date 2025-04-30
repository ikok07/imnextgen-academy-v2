import { ISubscriptionsRepository } from "@/src/application/repositories/payments/user-subscriptions.repository.interface"
import {
    IGetUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";
import {
    IGetUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import { IGetFullSubscriptionTiersUseCase } from "@/src/application/use-cases/payments/subscriptions/get-full-subscription-tiers.use-case";
import { IGetFullSubscriptionTiersController } from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers.controller";
import { ICreateUserSubscriptionUseCase } from "@/src/application/use-cases/payments/subscriptions/create-user-subscription.use-case";
import {
    ICreateUserSubscriptionController
} from "@/src/interface-adapters/controllers/payments/subscriptions/create-user-subscription.controller";
import { IRemoveUserSubscriptionController } from "@/src/interface-adapters/controllers/payments/subscriptions/remove-user-subscription.controller";
import {
    IRemoveUserSubscriptionUseCase
} from "@/src/application/use-cases/payments/subscriptions/remove-user-subscription.use-case";
import {
    IGetFullSubscriptionTiersByProductIdsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-full-subscription-tiers-by-product-ids.use-case";
import {
    IGetFullSubscriptionTiersByProductIdsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers-by-product-ids.controller";

export const SUBSCRIPTIONS_SYMBOLS = {
    ISubscriptionsRepository: Symbol.for("ISubscriptionsRepository"),

    IGetUserSubscriptionsUseCase: Symbol.for("IGetUserSubscriptionsUseCase"),
    IGetUserSubscriptionsController: Symbol.for("IGetUserSubscriptionsController"),

    IGetFullSubscriptionTiersUseCase: Symbol.for("IGetFullSubscriptionTiersUseCase"),
    IGetFullSubscriptionTiersController: Symbol.for("IGetFullSubscriptionTiersController"),

    IGetFullSubscriptionTiersByProductIdsUseCase: Symbol.for("IGetFullSubscriptionTiersByProductIdsUseCase"),
    IGetFullSubscriptionTiersByProductIdsController: Symbol.for("IGetFullSubscriptionTiersByProductIdsController"),

    ICreateUserSubscriptionUseCase: Symbol.for("ICreateUserSubscriptionUseCase"),
    ICreateUserSubscriptionController: Symbol.for("ICreateUserSubscriptionController"),

    IRemoveUserSubscriptionUseCase: Symbol.for("IRemoveUserSubscriptionUseCase"),
    IRemoveUserSubscriptionController: Symbol.for("IRemoveUserSubscriptionController")
}

export interface SUBSCRIPTIONS_RETURN_TYPES {
    ISubscriptionsRepository: ISubscriptionsRepository,

    IGetUserSubscriptionsUseCase: IGetUserSubscriptionsUseCase,
    IGetUserSubscriptionsController: IGetUserSubscriptionsController,

    IGetFullSubscriptionTiersUseCase: IGetFullSubscriptionTiersUseCase,
    IGetFullSubscriptionTiersController: IGetFullSubscriptionTiersController,

    IGetFullSubscriptionTiersByProductIdsUseCase: IGetFullSubscriptionTiersByProductIdsUseCase,
    IGetFullSubscriptionTiersByProductIdsController: IGetFullSubscriptionTiersByProductIdsController,

    ICreateUserSubscriptionUseCase: ICreateUserSubscriptionUseCase,
    ICreateUserSubscriptionController: ICreateUserSubscriptionController,

    IRemoveUserSubscriptionUseCase: IRemoveUserSubscriptionUseCase,
    IRemoveUserSubscriptionController: IRemoveUserSubscriptionController
}


