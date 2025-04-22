import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    getUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import {UserSubscriptionsRepository} from "@/src/infrastructure/repositories/payments/user-subscriptions.repository";
import {
    addUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/add-user-subscriptions.use-case";
import {
    updateUserSubscriptionTierUseCase
} from "@/src/application/use-cases/payments/subscriptions/update-user-subscription-tier.use-case";
import {
    getUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";
import {
    addUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/add-user-subscriptions.controller";
import {
    updateUserSubscriptionTierController
} from "@/src/interface-adapters/controllers/payments/subscriptions/update-user-subscription-tier.controller";

export function createUserSubscriptionsModule() {
    const userSubscriptionsModule = createModule();

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IUserSubscriptionsRepository)
        .toClass(UserSubscriptionsRepository);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IGetUserSubscriptionsUseCase)
        .toHigherOrderFunction(getUserSubscriptionsUseCase, [DI_SYMBOLS.IUserSubscriptionsRepository]);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IGetUserSubscriptionsController)
        .toHigherOrderFunction(getUserSubscriptionsController, [DI_SYMBOLS.IGetUserSubscriptionsUseCase]);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IAddUserSubscriptionsUseCase)
        .toHigherOrderFunction(addUserSubscriptionsUseCase, [DI_SYMBOLS.IUserSubscriptionsRepository]);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IAddUserSubscriptionsController)
        .toHigherOrderFunction(addUserSubscriptionsController, [DI_SYMBOLS.IAddUserSubscriptionsUseCase]);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IUpdateUserSubscriptionTierUseCase)
        .toHigherOrderFunction(updateUserSubscriptionTierUseCase, [DI_SYMBOLS.IUserSubscriptionsRepository]);

    userSubscriptionsModule
        .bind(DI_SYMBOLS.IUpdateUserSubscriptionTierController)
        .toHigherOrderFunction(updateUserSubscriptionTierController, [DI_SYMBOLS.IUpdateUserSubscriptionTierUseCase]);

    return userSubscriptionsModule;
}