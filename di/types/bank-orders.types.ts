import { IBankOrdersRepository } from "@/src/application/repositories/payments/bank-orders.repository.interface";
import { IGetPendingOrdersUseCase } from "@/src/application/use-cases/payments/bank-orders/get-pending-orders.use-case";
import {IUpdateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/update-order.use-case";
import {ICreateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/create-order.use-case";
import {IDeleteOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/delete-order.use-case";
import {
    IUpdateOrderProductUseCase
} from "@/src/application/use-cases/payments/bank-orders/update-order-product.use-case";
import {
    IUpdateOrderController
} from "@/src/interface-adapters/controllers/payments/bank-orders/update-order.controller";

export const BANK_ORDERS_SYMBOLS = {
    IBankOrdersRepository: Symbol.for("IBankOrdersRepository"),

    IGetPendingOrdersUseCase: Symbol.for("IGetPendingOrdersUseCase"),
    ICreateOrderUseCase: Symbol.for("ICreateOrderUseCase"),
    IUpdateOrderUseCase: Symbol.for("IUpdateOrderUseCase"),
    IUpdateOrderController: Symbol.for("IUpdateOrderController"),

    IUpdateOrderProductUseCase: Symbol.for("IUpdateOrderProductUseCase"),
    IDeleteOrderUseCase: Symbol.for("IDeleteOrderUseCase")
}

export interface BANK_ORDERS_RETURN_TYPES {
    IBankOrdersRepository: IBankOrdersRepository,

    IGetPendingOrdersUseCase: IGetPendingOrdersUseCase,
    ICreateOrderUseCase: ICreateOrderUseCase,
    IUpdateOrderUseCase: IUpdateOrderUseCase,
    IUpdateOrderController: IUpdateOrderController

    IUpdateOrderProductUseCase: IUpdateOrderProductUseCase,
    IDeleteOrderUseCase: IDeleteOrderUseCase
}


