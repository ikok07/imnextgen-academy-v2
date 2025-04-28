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
} from "@/src/application/use-cases/payments/subscriptions/get-subscription-tiers.use-case";
import {
    getFullSubscriptionTiersController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-full-subscription-tiers.controller";

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

    return subscriptionsModule;
}