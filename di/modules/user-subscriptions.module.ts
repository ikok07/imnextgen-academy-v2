import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {
    getUserSubscriptionsUseCase
} from "@/src/application/use-cases/payments/subscriptions/get-user-subscriptions.use-case";
import {UserSubscriptionsRepository} from "@/src/infrastructure/repositories/payments/user-subscriptions.repository";
import {
    getUserSubscriptionsController
} from "@/src/interface-adapters/controllers/payments/subscriptions/get-user-subscriptions.controller";

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

    return userSubscriptionsModule;
}