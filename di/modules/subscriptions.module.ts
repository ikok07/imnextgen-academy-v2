import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    getUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import {SubscriptionsRepository} from "@/src/infrastructure/repositories/payments/subscriptions.repository";
import {
    getUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";
import {
    getFullSubscriptionTiersUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-full-subscription-tiers.use-case";
import {
    getFullSubscriptionTiersController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers.controller";
import {
    createUserSubscriptionUseCase
} from "@/src/application/use-cases/payments/subscriptions/create-user-subscription.use-case";
import {
    createUserSubscriptionController
} from "@/src/interface-adapters/controllers/payments/subscriptions/create-user-subscription.controller";
import {
    removeUserSubscriptionUseCase
} from "@/src/application/use-cases/payments/subscriptions/remove-user-subscription.use-case";
import {
    removeUserSubscriptionController
} from "@/src/interface-adapters/controllers/payments/subscriptions/remove-user-subscription.controller";
import {
    getFullSubscriptionTiersByProductIdsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-full-subscription-tiers-by-product-ids.use-case";
import {
    getFullSubscriptionTiersByProductIdsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers-by-product-ids.controller";

export function createSubscriptionsModule() {
    const subscriptionsModule = createModule();

    subscriptionsModule
        .bind(DI_SYMBOLS.ISubscriptionsRepository)
        .toClass(SubscriptionsRepository);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetUserSubscriptionsUseCase)
        .toHigherOrderFunction(getUserSubscriptionsUseCase, [DI_SYMBOLS.ISubscriptionsRepository]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetUserSubscriptionsController)
        .toHigherOrderFunction(getUserSubscriptionsController, [DI_SYMBOLS.IGetUserSubscriptionsUseCase]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetFullSubscriptionTiersUseCase)
        .toHigherOrderFunction(getFullSubscriptionTiersUseCase, [DI_SYMBOLS.ISubscriptionsRepository]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetFullSubscriptionTiersController)
        .toHigherOrderFunction(getFullSubscriptionTiersController, [DI_SYMBOLS.IGetFullSubscriptionTiersUseCase]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetFullSubscriptionTiersByProductIdsUseCase)
        .toHigherOrderFunction(getFullSubscriptionTiersByProductIdsUseCase, [DI_SYMBOLS.ISubscriptionsRepository]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IGetFullSubscriptionTiersByProductIdsController)
        .toHigherOrderFunction(getFullSubscriptionTiersByProductIdsController, [DI_SYMBOLS.IGetFullSubscriptionTiersByProductIdsUseCase]);

    subscriptionsModule
        .bind(DI_SYMBOLS.ICreateUserSubscriptionUseCase)
        .toHigherOrderFunction(createUserSubscriptionUseCase, [DI_SYMBOLS.ISubscriptionsRepository]);

    subscriptionsModule
        .bind(DI_SYMBOLS.ICreateUserSubscriptionController)
        .toHigherOrderFunction(createUserSubscriptionController, [DI_SYMBOLS.ICreateUserSubscriptionUseCase]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IRemoveUserSubscriptionUseCase)
        .toHigherOrderFunction(removeUserSubscriptionUseCase, [DI_SYMBOLS.ISubscriptionsRepository]);

    subscriptionsModule
        .bind(DI_SYMBOLS.IRemoveUserSubscriptionController)
        .toHigherOrderFunction(removeUserSubscriptionController, [DI_SYMBOLS.IRemoveUserSubscriptionUseCase]);

    return subscriptionsModule;
}