import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {BankOrdersRepository} from "@/src/infrastructure/repositories/payments/bank-orders.repository";
import {getPendingOrdersUseCase} from "@/src/application/use-cases/payments/bank-orders/get-pending-orders.use-case";
import {createOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/create-order.use-case";
import {updateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/update-order.use-case";

export function createBankOrdersModule() {
    const bankOrdersModule = createModule();

    bankOrdersModule
        .bind(DI_SYMBOLS.IBankOrdersRepository)
        .toClass(BankOrdersRepository);

    bankOrdersModule
        .bind(DI_SYMBOLS.IGetPendingOrdersUseCase)
        .toHigherOrderFunction(getPendingOrdersUseCase, [DI_SYMBOLS.IBankOrdersRepository]);

    bankOrdersModule
        .bind(DI_SYMBOLS.ICreateOrderUseCase)
        .toHigherOrderFunction(createOrderUseCase, [DI_SYMBOLS.IBankOrdersRepository]);

    bankOrdersModule
        .bind(DI_SYMBOLS.IUpdateOrderUseCase)
        .toHigherOrderFunction(updateOrderUseCase, [DI_SYMBOLS.IBankOrdersRepository]);

    return bankOrdersModule;
}