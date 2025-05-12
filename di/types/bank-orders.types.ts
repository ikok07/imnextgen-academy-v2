import { IBankOrdersRepository } from "@/src/application/repositories/payments/bank-orders.repository.interface";
import { IGetPendingOrdersUseCase } from "@/src/application/use-cases/payments/bank-orders/get-pending-orders.use-case";
import {IUpdateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/update-order.use-case";
import {ICreateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/create-order.use-case";

export const BANK_ORDERS_SYMBOLS = {
    IBankOrdersRepository: Symbol.for("IBankOrdersRepository"),

    IGetPendingOrdersUseCase: Symbol.for("IGetPendingOrdersUseCase"),
    ICreateOrderUseCase: Symbol.for("ICreateOrderUseCase"),
    IUpdateOrderUseCase: Symbol.for("IUpdateOrderUseCase")
}

export interface BANK_ORDERS_RETURN_TYPES {
    IBankOrdersRepository: IBankOrdersRepository,

    IGetPendingOrdersUseCase: IGetPendingOrdersUseCase,
    ICreateOrderUseCase: ICreateOrderUseCase,
    IUpdateOrderUseCase: IUpdateOrderUseCase
}


