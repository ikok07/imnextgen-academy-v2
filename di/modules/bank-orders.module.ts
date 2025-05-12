import {createModule} from "@evyweb/ioctopus";
import {DI_SYMBOLS} from "@/di/types/types";
import {BankOrdersRepository} from "@/src/infrastructure/repositories/payments/bank-orders.repository";
import {getPendingOrdersUseCase} from "@/src/application/use-cases/payments/bank-orders/get-pending-orders.use-case";
import {createOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/create-order.use-case";
import {updateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/update-order.use-case";
import {
    updateOrderProductUseCase
} from "@/src/application/use-cases/payments/bank-orders/update-order-product.use-case";
import {deleteOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/delete-order.use-case";
import {updateOrderController} from "@/src/interface-adapters/controllers/payments/bank-orders/update-order.controller";

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

    bankOrdersModule
        .bind(DI_SYMBOLS.IUpdateOrderController)
        .toHigherOrderFunction(updateOrderController, [DI_SYMBOLS.IUpdateOrderUseCase]);

    bankOrdersModule
        .bind(DI_SYMBOLS.IUpdateOrderProductUseCase)
        .toHigherOrderFunction(updateOrderProductUseCase, [DI_SYMBOLS.IBankOrdersRepository]);

    bankOrdersModule
        .bind(DI_SYMBOLS.IDeleteOrderUseCase)
        .toHigherOrderFunction(deleteOrderUseCase, [DI_SYMBOLS.IBankOrdersRepository]);

    return bankOrdersModule;
}